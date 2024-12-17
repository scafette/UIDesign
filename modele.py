class Product:
    def __init__(self, id, name, description, price, image_url):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.image_url = image_url

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url
        }