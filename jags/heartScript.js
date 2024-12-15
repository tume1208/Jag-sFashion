document.addEventListener("DOMContentLoaded", function() {
    const favoritesContainer = document.querySelector(".favorites-items");
    const userNameElement = document.getElementById("user-name");

    function displayLikedProducts() {
        const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
        favoritesContainer.innerHTML = "";

        likedProducts.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("favorite-item");

            productElement.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}">
                    <i class="fas fa-heart heart-icon active"></i>
                </div>
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            `;

            productElement.querySelector(".heart-icon").addEventListener("click", function(event) {
                event.stopPropagation();
                this.classList.toggle("active");

                let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
                if (!this.classList.contains("active")) {
                    likedProducts = likedProducts.filter(p => p.id !== product.id);
                }
                localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
                displayLikedProducts(); // Refresh the list
            });

            favoritesContainer.appendChild(productElement);
        });
    }

    function checkLoggedIn() {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            userNameElement.textContent = loggedInUser.name;
        }
    }

    displayLikedProducts();
    checkLoggedIn();
});
