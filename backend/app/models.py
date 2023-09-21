from flask import current_app
from datetime import datetime, timedelta
from jwt import decode, encode, ExpiredSignatureError, InvalidTokenError
from uuid import uuid4
from app import db


def generate_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(
        db.String(32),
        primary_key=True,
        unique=True,
        nullable=False,
        default=lambda: uuid4().hex,
    )
    email = db.Column(db.String(345), unique=True, nullable=False)
    provider = db.Column(db.String(64), nullable=False)

    @staticmethod
    def generate_access_token(user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                "exp": datetime.utcnow() + timedelta(days=0, seconds=3600),
                "iat": datetime.utcnow(),
                "sub": user_id,
            }
            return encode(
                payload,
                current_app.config["ACCESS_TOKEN_KEY"],
                algorithm="HS256",
            )
        except Exception as e:
            return e

    @staticmethod
    def generate_refresh_token(user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                "exp": datetime.utcnow() + timedelta(days=1, seconds=0),
                "iat": datetime.utcnow(),
                "sub": user_id,
            }
            return encode(
                payload,
                current_app.config["REFRESH_TOKEN_KEY"],
                algorithm="HS256",
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_access_token(access_token):
        """
        Decodes the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = decode(access_token, current_app.config["ACCESS_TOKEN_KEY"])
            user = User.query.get(payload["sub"])
            return user
        except ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except InvalidTokenError:
            return "Invalid token. Please log in again."

    @staticmethod
    def renew_access_token(refresh_token):
        try:
            payload = decode(refresh_token, current_app.config["REFRESH_TOKEN_KEY"])
            user_id = payload["sub"]
            if not User.query.get(user_id):
                raise InvalidTokenError
            return User.generate_access_token(payload["sub"])
        except ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except InvalidTokenError:
            return "Invalid token. Please log in again."
