document.addEventListener("DOMContentLoaded", function() {
    const mainImage = document.getElementById("main-image");
    const productName = document.getElementById("product-name");
    const productPrice = document.getElementById("product-price");
    const productDescription = document.getElementById("product-description");
    const productSize = document.getElementById("product-size");
    const thumbnails = document.querySelectorAll(".product-thumbnails .thumbnail");
    const addToCartButton = document.getElementById("add-to-cart-button");
    const heartIcon = document.querySelector(".heart-icon");
    const userNameElement = document.getElementById("user-name");

    function showProductDetails(product) {
        mainImage.src = product.image;
        productName.textContent = product.name;
        const salePrice = product.salePercentage ? (product.price * (1 - product.salePercentage / 100)).toFixed(2) : null;
        productPrice.innerHTML = product.salePercentage ? `<span class="original-price">${product.price}</span> <span class="sale-price">${salePrice}</span>` : product.price;
        productDescription.textContent = product.description;
        productSize.textContent = "Size: " + product.size;

        // Update thumbnails
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.src = product.smallImages[index];
            thumbnail.addEventListener("click", function() {
                mainImage.src = thumbnail.src;
            });
        });

        // Add to Cart button functionality
        addToCartButton.addEventListener("click", function() {
            addToCart(product);
        });

        // Update heart icon state
        if (heartIcon) {
            updateHeartIcon(product);
        }
    }

    function addToCart(product) {
        const cartItems = getCartItems();
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }

        saveCartItems(cartItems);
        alert("Бүтээгдэхүүн сагсанд нэмэгдлээ!");
    }

    function getCartItems() {
        return JSON.parse(localStorage.getItem("cartItems")) || [];
    }

    function saveCartItems(cartItems) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    function updateHeartIcon(product) {
        const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
        const isLiked = likedProducts.some(p => p.id == product.id);
        if (isLiked) {
            heartIcon.classList.add("active");
        } else {
            heartIcon.classList.remove("active");
        }

        heartIcon.addEventListener("click", function(event) {
            event.stopPropagation();
            this.classList.toggle("active");

            let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
            if (this.classList.contains("active")) {
                likedProducts.push(product);
            } else {
                likedProducts = likedProducts.filter(p => p.id != product.id);
            }
            localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
        });
    }

    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Find the product by ID
    const product = products.find(p => p.id == productId);

    // Show the product details
    if (product) {
        showProductDetails(product);
    }
    function checkLoggedIn() {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            userNameElement.textContent = loggedInUser.name;
        }
    }

    checkLoggedIn();
});
