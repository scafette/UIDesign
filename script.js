const productsContainer = document.getElementById("products-container");
const loadingMessage = document.getElementById("loading-message");

let id_start = 0; // ID de départ pour la pagination
const productsPerPage = 24; // Nombre de produits par requête
let isLoading = false;

// Fonction pour récupérer les produits
async function fetchProducts() {
    if (isLoading) return; // Empêche les requêtes simultanées
    isLoading = true;

    // Afficher le message de chargement
    loadingMessage.style.display = "block";

    try {
        const response = await fetch(`http://localhost:8080/products?id_start=${id_start}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des produits");

        const data = await response.json();
        displayProducts(data.products);

        // Met à jour l'ID de départ pour la page suivante
        id_start += productsPerPage;
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        isLoading = false;
        loadingMessage.style.display = "none";
    }
}

// Fonction pour afficher les produits dans le DOM
function displayProducts(products) {
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product";
        productCard.innerHTML = `
            <h2 class="product-title">${product.name}</h2>
            <img src="${product.image_url}" alt="${product.name}" />
            <p class="product-description">${product.description}</p>
            <p class="price">${parseFloat(product.price).toFixed(2)}€</p>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Fonction pour gérer le scroll infini
function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        fetchProducts();
    }
}

// Ajouter l'écouteur d'événements pour le scroll
window.addEventListener("scroll", handleScroll);

// Chargement initial des produits
fetchProducts();