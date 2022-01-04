import requests
import json
from flask import Flask, render_template, redirect, url_for, Blueprint, request, flash

bp = Blueprint('main', __name__)

@bp.route('/')
def redirigir():
    return redirect(url_for('main.index', page=1))

@bp.route('/<page>', methods=['GET', 'POST'])
def index(page):

    if int(page) > 42 or int(page) <= 0:
        return redirect(url_for('main.index', page=1))
        
    url = f'https://rickandmortyapi.com/api/character?page={page}'
    r = requests.get(url).json()
    resultados = len(r['results'])
    next = ''
    prev = ''

    try:
        url_next = r['info']['next']
        for chr in url_next:
            if chr.isdigit():
                next += str(chr)
        next = int(next)
    except:
        next = '43'
        pass

    try:
        url_prev = r['info']['prev']
        for char in url_prev:
            if char.isdigit():
                prev += str(char)
    except:
        pass

    next = int(next)

    return render_template('index.html', r=r, resultados=resultados, next=next, prev=prev)



