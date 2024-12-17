from flask import Flask, jsonify, request
from flask_cors import CORS  # Importer CORS
import sqlite3
from modele import Product

app = Flask(__name__)

CORS(app)

@app.route("/products", methods=["GET"])
def get_products():
    start = request.args.get("id_start", default=0, type=int)  # Default à 0 si non précisé
    limit = 36  

    conn = sqlite3.connect("./db.sql")
    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM products
        WHERE id >= ?
        LIMIT ?;
    """, (start, limit))
    
    rows = cursor.fetchall()
    conn.close()

    products = [
        Product(id=row[0], name=row[1], description=row[2], price=row[3], image_url=row[4]).to_dict()
        for row in rows
    ]

    return jsonify({"products": products})

if __name__ == "__main__":
    app.run(debug=True, port=8080)