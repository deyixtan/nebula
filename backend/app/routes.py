import json
import requests
from base64 import b64encode
from urllib.parse import urlencode
from secrets import token_urlsafe
from flask import (
    Blueprint,
    current_app,
    request,
    session,
    abort,
    make_response,
    redirect,
    url_for,
)
from sqlalchemy import and_
from app import db, sock
from app.containers import *
from app.models import User

bp = Blueprint("bp", __name__)


@sock.route("/ws")
def echo(ws):
    while True:
        try:
            type, data = json.loads(ws.receive()).values()
            if type == "image-list":
                ws.send(json.dumps({"type": type, "data": get_docker_images()}))
            elif type == "container-list":
                ws.send(json.dumps({"type": type, "data": get_docker_containers()}))
            elif type == "pull-image":
                pull_image(data)
                ws.send(json.dumps({"type": type, "data": data}))
            elif type == "remove-image":
                remove_image()
            elif type == "run-image":
                run_image(data["imageName"], data["command"], data["ports"])
        except Exception as e:
            print(e)


@bp.route("/authorize/<provider>")
def oauth2_authorize(provider):
    provider_data = current_app.config["OAUTH2_PROVIDERS"].get(provider)
    if provider_data is None:
        abort(404)

    session["oauth2_state"] = token_urlsafe(16)
    query_params = urlencode(
        {
            "client_id": provider_data["client_id"],
            "redirect_uri": url_for(
                "bp.oauth2_callback", provider=provider, _external=True
            ),
            "response_type": "code",
            "scope": " ".join(provider_data["scopes"]),
            "state": session["oauth2_state"],
        }
    )
    return redirect(provider_data["authorize_url"] + "?" + query_params)


@bp.route("/callback/<provider>")
def oauth2_callback(provider):
    provider_data = current_app.config["OAUTH2_PROVIDERS"].get(provider)
    if provider_data is None:
        abort(404)

    if "error" in request.args:
        return redirect(current_app.config["FRONTEND_URL"])

    if request.args["state"] != session.get("oauth2_state"):
        abort(401)
    session.pop("oauth2_state")

    if "code" not in request.args:
        abort(401)

    response = requests.post(
        provider_data["token_url"],
        data={
            "client_id": provider_data["client_id"],
            "client_secret": provider_data["client_secret"],
            "code": request.args["code"],
            "grant_type": "authorization_code",
            "redirect_uri": url_for(
                "bp.oauth2_callback", provider=provider, _external=True
            ),
        },
        headers={"Accept": "application/json"},
    )

    if response.status_code != 200:
        abort(401)

    oauth2_token = response.json().get("access_token")
    if not oauth2_token:
        abort(401)

    response = requests.get(
        provider_data["userinfo"]["url"],
        headers={
            "Authorization": "Bearer " + oauth2_token,
            "Accept": "application/json",
        },
    )

    if response.status_code != 200:
        abort(401)
    email = provider_data["userinfo"]["email"](response.json())

    user = db.session.scalar(
        db.select(User).where(and_(User.email == email, User.provider == provider))
    )

    if user is None:
        user = User(email=email, provider=provider)
        db.session.add(user)
        db.session.commit()

    response = make_response()
    try:
        access_token = User.generate_access_token(user.id).encode()
        refresh_token = User.generate_refresh_token(user.id).encode()
        encoded_token = b64encode(access_token + b"+" + refresh_token).decode()

        current_app.redis.hset("refresh_tokens", user.id, refresh_token)
        response.set_cookie(
            "refreshToken", refresh_token, httponly=True, path="/refresh"
        )
        response.set_cookie(
            "refreshToken", refresh_token, httponly=True, path="/logout"
        )

        response.status_code = 302
        response.headers["Location"] = (
            current_app.config["FRONTEND_AUTH_CALLBACK_URL"] + "/" + encoded_token
        )
    except Exception as e:
        abort(401)
    return response


@bp.route("/refresh", methods=["POST"])
def refresh_access_token():
    if not request.cookies.getlist("refreshToken"):
        abort(401)
    refresh_token = request.cookies.getlist("refreshToken")[0]
    return {"accessToken": User.renew_access_token(refresh_token)}
