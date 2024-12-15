document.addEventListener("DOMContentLoaded", function() {
    const changeImageLink = document.getElementById("change-image");
    const logoImage = document.getElementById("logo-image");
    const sidebarMenu = document.getElementById("sidebar-menu");

    // Check for saved image URL in localStorage
    const savedImageUrl = localStorage.getItem("logoImageUrl");
    if (savedImageUrl) {
        logoImage.src = savedImageUrl;
    }

    if (changeImageLink) {
        changeImageLink.addEventListener("click", function(event) {
            event.preventDefault();
            const fileInput = document.createElement("input");
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.onchange = function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const newImageUrl = e.target.result;
                        logoImage.src = newImageUrl;
                        localStorage.setItem("logoImageUrl", newImageUrl);
                        sidebarMenu.style.display = "none";
                    };
                    reader.readAsDataURL(file);
                }
            };
            fileInput.click();
        });
    }
});
