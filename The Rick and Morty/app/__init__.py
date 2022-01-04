import os

from flask import Flask, app, render_template, Blueprint

def create_app():
    app = Flask(__name__)

    from . import main
    app.register_blueprint(main.bp)

    return app
