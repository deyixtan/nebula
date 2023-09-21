from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from redis import Redis
from config import Config

db = SQLAlchemy()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # cors-related
    CORS(app, supports_credentials=True)

    # db-related
    db.init_app(app)
    with app.app_context():
        db.create_all()

    # redis-related
    app.redis = Redis(
        host=app.config["REDIS_HOST"], port=app.config["REDIS_PORT"], db=0
    )
    app.redis.flushall()

    # setting up routes
    from app.routes import bp

    app.register_blueprint(bp)

    return app
