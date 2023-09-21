import os
from dotenv import load_dotenv


load_dotenv()


class Config:
    SECRET_KEY = os.environ["SECRET_KEY"]
    ACCESS_TOKEN_KEY = "12345"
    REFRESH_TOKEN_KEY = "67890"

    SOCK_SERVER_OPTIONS = {"ping_interval": 25}

    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True  # in prod should be false

    REDIS_HOST = "localhost"
    REDIS_PORT = 6379

    FRONTEND_URL = "http://localhost:5173"
    FRONTEND_AUTH_CALLBACK_URL = FRONTEND_URL + "/auth-callback"
    OAUTH2_PROVIDERS = {
        # GitHub OAuth 2.0 documentation:
        # https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
        "github": {
            "client_id": os.environ.get("GITHUB_CLIENT_ID"),
            "client_secret": os.environ.get("GITHUB_CLIENT_SECRET"),
            "authorize_url": "https://github.com/login/oauth/authorize",
            "token_url": "https://github.com/login/oauth/access_token",
            "userinfo": {
                "url": "https://api.github.com/user/emails",
                "email": lambda json: json[0]["email"],
            },
            "scopes": ["user:email"],
        },
        # Google OAuth 2.0 documentation:
        # https://developers.google.com/identity/protocols/oauth2/web-server#httprest
        "google": {
            "client_id": os.environ.get("GOOGLE_CLIENT_ID"),
            "client_secret": os.environ.get("GOOGLE_CLIENT_SECRET"),
            "authorize_url": "https://accounts.google.com/o/oauth2/auth",
            "token_url": "https://accounts.google.com/o/oauth2/token",
            "userinfo": {
                "url": "https://www.googleapis.com/oauth2/v3/userinfo",
                "email": lambda json: json["email"],
            },
            "scopes": ["https://www.googleapis.com/auth/userinfo.email"],
        },
    }
