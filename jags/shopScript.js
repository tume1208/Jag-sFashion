document.addEventListener("DOMContentLoaded", function() {
    const saleProductsContainer = document.querySelector("#sale-products .product-grid");
    const sunglassesProductsContainer = document.querySelector("#sunglasses-products .product-grid");
    const eyeframesProductsContainer = document.querySelector("#eyeframes-products .product-grid");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const userNameElement = document.getElementById("user-name");

    function displayProducts(products, container) {
        if (!container) {
            console.error("Container not found");
            return;
        }

        container.innerHTML = "";

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

            container.appendChild(productElement);
        });
    }

    function filterProducts(query) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        // Clear existing products in all categories
        saleProductsContainer.innerHTML = "";
        sunglassesProductsContainer.innerHTML = "";
        eyeframesProductsContainer.innerHTML = "";

        // Display filtered products in their respective categories
        filteredProducts.forEach(product => {
            if (product.category === "sale") {
                displayProducts([product], saleProductsContainer);
            } else if (product.category === "sunglasses") {
                displayProducts([product], sunglassesProductsContainer);
            } else if (product.category === "eyeframes") {
                displayProducts([product], eyeframesProductsContainer);
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener("click", function() {
            const query = searchInput.value.trim();
            if (query) {
                filterProducts(query);
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                const query = searchInput.value.trim();
                if (query) {
                    filterProducts(query);
                }
            }
        });
    }

    // Display products by category
    const saleProducts = products.filter(product => product.category === "sale");
    const sunglassesProducts = products.filter(product => product.category === "sunglasses");
    const eyeframesProducts = products.filter(product => product.category === "eyeframes");

    displayProducts(saleProducts, saleProductsContainer);
    displayProducts(sunglassesProducts, sunglassesProductsContainer);
    displayProducts(eyeframesProducts, eyeframesProductsContainer);

    // Add event listeners for right arrow icons
    document.querySelectorAll(".right-arrow").forEach(arrow => {
        arrow.addEventListener("click", function() {
            const category = this.dataset.category;
            displayAllProducts(category);
            this.previousElementSibling.style.display = "inline"; // Show the left arrow
        });
    });

    // Add event listeners for left arrow icons
    document.querySelectorAll(".left-arrow").forEach(arrow => {
        arrow.addEventListener("click", function() {
            window.location.href = "shop.html"; // Redirect to shop.html
        });
    });

    function displayAllProducts(category) {
        const filteredProducts = products.filter(product => product.category === category);
        saleProductsContainer.parentElement.style.display = "none";
        sunglassesProductsContainer.parentElement.style.display = "none";
        eyeframesProductsContainer.parentElement.style.display = "none";

        if (category === "sale") {
            saleProductsContainer.parentElement.style.display = "block";
            displayProducts(filteredProducts, saleProductsContainer);
        } else if (category === "sunglasses") {
            sunglassesProductsContainer.parentElement.style.display = "block";
            displayProducts(filteredProducts, sunglassesProductsContainer);
        } else if (category === "eyeframes") {
            eyeframesProductsContainer.parentElement.style.display = "block";
            displayProducts(filteredProducts, eyeframesProductsContainer);
        }
    }

    function checkLoggedIn() {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            userNameElement.textContent = loggedInUser.name;
        }
    }

    checkLoggedIn();
});
