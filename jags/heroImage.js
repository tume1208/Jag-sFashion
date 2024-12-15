document.addEventListener("DOMContentLoaded", function() {
    const heroImage = document.getElementById("hero-image");
    const images = [
        'images/head.jpg',
        'images/p2.jpg',
        'images/p3.jpg'
    ];
    let currentIndex = 0;

    function changeImage() {
        heroImage.style.backgroundImage = `url(${images[currentIndex]})`;
        currentIndex = (currentIndex + 1) % images.length;
    }

    setInterval(changeImage, 5000);
    changeImage(); // Initial call to set the first image

    const sunglassesContainer = document.querySelector("#sunglasses .product-slider");
    const eyeframesContainer = document.querySelector("#eyeframes .product-slider");

    window.displayProducts = function(products) {
        sunglassesContainer.innerHTML = "";
        eyeframesContainer.innerHTML = "";

        const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            const isLiked = likedProducts.some(p => p.id === product.id);

            productElement.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}">
                    <i class="fas fa-heart heart-icon ${isLiked ? 'active' : ''}"></i>
                </div>
                <h3>${product.name}</h3>
                <p>${product.price}</p>
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

            if (product.category === "sunglasses") {
                sunglassesContainer.appendChild(productElement);
            } else if (product.category === "eyeframes") {
                eyeframesContainer.appendChild(productElement);
            }
        });
    }

    // Assuming products data is available globally
    displayProducts(products);
});
