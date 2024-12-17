import os
from database import create_db, faker_products
import serveur

# Initialiser la base de données si elle n'existe pas
if not os.path.exists("db.sql"):
    print("Base de données non existante, création en cours...")
    create_db()
    faker_products()
    print("Base de données et produits fictifs créés.")

# Démarrer le serveur Flask
print("Démarrage du serveur...")
serveur.app.run(debug=True, port=8080)