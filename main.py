from flask import Flask, render_template, request, url_for

import requests
import random

app = Flask(__name__)

CARDS_PER_PAGE = 175

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method != "POST":
        return render_template("index.html")

    query = request.form["query"]
    amount = int(request.form["amount"])

    cards = []

    tries = 0

    while len(cards) < amount:
        result = requests.get(f"https://api.scryfall.com/cards/random?q={query.replace(' ', '+')}+game:paper").json()
        if result in cards or "image_uris" not in result:
            tries += 1
            continue
        elif tries > 10:
            break

        cards.append(result)
    
    return render_template(
        "search.html",
        query=query,
        amount=amount,
        commanders=cards,
        length=len(cards)
    )

app.run("0.0.0.0")
