from flask import Flask
from flask_cors import CORS
from routes.Router import Router

from latex2sympy2 import latex2sympy, latex2latex
from flask import request, jsonify
import requests
from sympy import *
import re

import base64
from io import BytesIO
import os
from pix2tex import cli as pix2tex
from PIL import Image
import PIL

import cloudinary
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/test", methods=["POST"])
# @app.route("/test")
def index():
    if request.method == "POST":
        img = request.json['img']
        print(img)
        
        if int(PIL.__version__[0]) < 9:
            print('Mandatory restart: Execute this cell again!')
            os.kill(os.getpid(), 9)

        response = requests.get(img)
        image_data = response.content

        image_base64 = base64.b64encode(image_data)
        image_bytes = BytesIO(base64.b64decode(image_base64))

        img = Image.open(image_bytes)
        print(img)

        model = pix2tex.LatexOCR()
        predictions = []
        img = Image.open(image_bytes)
        math = model(img)
        print(math)
        raw_data = repr(math)
        expr = sympify(raw_data)
        print(latex2sympy(expr))
    return jsonify(latex2latex(expr))

Router.run(app)

if __name__ == "__main__":
    app.run(host='localhost', port='8081', debug=True)