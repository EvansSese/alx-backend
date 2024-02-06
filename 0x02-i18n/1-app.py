#!/usr/bin/env python3
"""Flask app with Babel"""

from flask import Flask, render_template
from flask_babel import Babel

app = Flask(__name__)


class Config:
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


babel = Babel(app)

app.config.from_object(Config)
if __name__ == '__main__':
    app.run(debug=True)
