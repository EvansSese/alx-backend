#!/usr/bin/env python3
"""Flask app with Babel"""

from flask import Flask, request
from flask_babel import Babel, _

app = Flask(__name__)


class Config:
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


babel = Babel(app)

app.config.from_object(Config)


@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(app.config['LANGUAGES'])


if __name__ == '__main__':
    app.run(debug=True)
