document.addEventListener("DOMContentLoaded", function() {
    const logoImage = document.getElementById("logo-image");
    const sidebarMenu = document.getElementById("sidebar-menu");
    const changeImageLink = document.getElementById("change-image");

    if (logoImage) {
        logoImage.addEventListener("click", function() {
            sidebarMenu.style.display = sidebarMenu.style.display === "block" ? "none" : "block";
        });
    }

    if (changeImageLink) {
        changeImageLink.addEventListener("click", function(event) {
            event.preventDefault();
            logoImage.src = "images/logo.png";
            sidebarMenu.style.display = "none";
        });
    }

    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const nightModeBtn = document.querySelector(".night-mode-btn");
    const userNameElement = document.getElementById("user-name");

    // Check for saved night mode preference
    if (localStorage.getItem('nightMode') === 'enabled') {
        document.body.classList.add('night-mode');
    }

    function filterProducts(query) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        // Assuming displayProducts is defined in searchScript.js
        displayProducts(filteredProducts);
    }

    if (searchButton) {
        searchButton.addEventListener("click", function() {
            const query = searchInput.value;
            filterProducts(query);
        });
    }

    if (searchInput) {
        searchInput.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                const query = searchInput.value;
                filterProducts(query);
            }
        });
    }

    if (nightModeBtn) {
        nightModeBtn.addEventListener("click", function() {
            document.body.classList.toggle("night-mode");
            if (document.body.classList.contains('night-mode')) {
                localStorage.setItem('nightMode', 'enabled');
            } else {
                localStorage.setItem('nightMode', 'disabled');
            }
        });
    }

    function checkLoggedIn() {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            userNameElement.textContent = loggedInUser.name;
        }
    }
    
    checkLoggedIn();
});
