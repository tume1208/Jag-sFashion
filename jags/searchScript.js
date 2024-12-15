document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");

    searchButton.addEventListener("click", function() {
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            displaySearchResults(query);
        }
    });

    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const query = searchInput.value.trim().toLowerCase();
            if (query) {
                displaySearchResults(query);
            }
        }
    });

    function displaySearchResults(query) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) || 
            product.description.toLowerCase().includes(query) ||
            product.size.toLowerCase().includes(query) // Include size in search criteria
        );

        displayProducts(filteredProducts);
    }

    // Other functions in searchScript.js
    function displayProducts(products) {
        const saleProductsContainer = document.querySelector("#sale-products .product-grid");
        const sunglassesProductsContainer = document.querySelector("#sunglasses-products .product-grid");
        const eyeframesProductsContainer = document.querySelector("#eyeframes-products .product-grid");

        // Clear existing products in all categories
        saleProductsContainer.innerHTML = "";
        sunglassesProductsContainer.innerHTML = "";
        eyeframesProductsContainer.innerHTML = "";

        const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            const isLiked = likedProducts.some(p => p.id === product.id);

            const salePrice = product.salePercentage ? (product.price * (1 - product.salePercentage / 100)).toFixed(2) : null;

            productElement.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}">
                    <i class="fas fa-heart heart-icon ${isLiked ? 'active' : ''}"></i>
                    ${product.salePercentage ? `<div class="sale-percentage">${product.salePercentage}%</div>` : ""}
                </div>
                <h3>${product.name}</h3>
                <p class="price">
                    ${product.salePercentage ? `<span class="original-price">${product.price}</span> <span class="sale-price">${salePrice}</span>` : product.price}
                </p>
            `;

            productElement.querySelector(".heart-icon").addEventListener("click", function(event) {
                event.stopPropagation();
                this.classList.toggle("active");

                let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
                if (this.classList.contains("active")) {
                    likedProducts.push(product);
                } else {
                    likedProducts = likedProducts.filter(p => p.id !== product.id);
                }
                localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
            });

            productElement.addEventListener("click", function() {
                window.location.href = `product.html?id=${product.id}`;
            });

            // Append product to the appropriate container
            if (product.category === "sale") {
                saleProductsContainer.appendChild(productElement);
            } else if (product.category === "sunglasses") {
                sunglassesProductsContainer.appendChild(productElement);
            } else if (product.category === "eyeframes") {
                eyeframesProductsContainer.appendChild(productElement);
            } else {
                console.error("Unknown product category:", product.category);
            }
        });
    }

    // Make displayProducts globally accessible
    window.displayProducts = displayProducts;
});
