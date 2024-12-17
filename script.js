const productsContainer = document.getElementById("products-container");
const loadingMessage = document.getElementById("loading-message");

let id_start = 0; 
const productsPerPage = 24; 
let isLoading = false;

async function fetchProducts() {
    if (isLoading) return; 
    isLoading = true;

    loadingMessage.style.display = "block";

    try {
        const response = await fetch(`http://localhost:8080/products?id_start=${id_start}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des produits");

        const data = await response.json();
        displayProducts(data.products);

        id_start += productsPerPage;
    } catch (error) {
        console.error("Erreur :", error);
    } finally {
        isLoading = false;
        loadingMessage.style.display = "none";
    }
}

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

function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        fetchProducts();
    }
}

window.addEventListener("scroll", handleScroll);

fetchProducts();