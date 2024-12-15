document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const giftCardItemsContainer = document.querySelector(".gift-card-items");
    const totalPriceElement = document.getElementById("total-price");
    const userNameElement = document.getElementById("user-name");

    function displayCartItems(cartItems) {
        cartItemsContainer.innerHTML = "";

        let totalPrice = 0;

        cartItems.forEach(item => {
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");

            const salePrice = item.salePercentage ? (item.price * (1 - item.salePercentage / 100)).toFixed(2) : item.price;

            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${salePrice}₮</p>
                </div>
                <div class="cart-item-quantity">
                    <input type="number" value="${item.quantity}" min="1">
                    <span class="cart-item-remove">✖</span>
                </div>
            `;

            cartItemElement.querySelector(".cart-item-remove").addEventListener("click", function() {
                removeCartItem(item.id);
            });

            cartItemElement.querySelector("input").addEventListener("change", function(event) {
                updateCartItemQuantity(item.id, event.target.value);
            });

            cartItemsContainer.appendChild(cartItemElement);

            totalPrice += salePrice * item.quantity;
        });

        totalPriceElement.textContent = `${totalPrice.toFixed(2)}₮`;
    }

    function removeCartItem(itemId) {
        const cartItems = getCartItems();
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        saveCartItems(updatedCartItems);
        displayCartItems(updatedCartItems);
    }

    function updateCartItemQuantity(itemId, quantity) {
        const cartItems = getCartItems();
        const updatedCartItems = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: parseInt(quantity) };
            }
            return item;
        });
        saveCartItems(updatedCartItems);
        displayCartItems(updatedCartItems);
    }

    function getCartItems() {
        return JSON.parse(localStorage.getItem("cartItems")) || [];
    }

    function saveCartItems(cartItems) {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // Display cart items on page load
    displayCartItems(getCartItems());

    function checkLoggedIn() {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
            userNameElement.textContent = loggedInUser.name;
        }
    }

    checkLoggedIn();
    
    // Additional code for handling gift cards and QR code generation
    function displayGiftCardItems(giftCardItems) {
        giftCardItemsContainer.innerHTML = "";

        let totalPrice = 0;

        giftCardItems.forEach(item => {
            const giftCardElement = document.createElement("div");
            giftCardElement.classList.add("cart-item");

            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(item.code)}`;

            giftCardElement.innerHTML = `
                <div class="cart-item-details">
                    <h3>Gift Card Code: ${item.code}</h3>
                    <p>${item.amount}₮</p>
                    <p>Dear: ${item.name}</p>
                    <img src="${qrCodeUrl}" alt="QR Code">
                    <button onclick="shareGiftCard('${item.code}', '${item.name}', ${item.amount})">Share</button>
                </div>
                <div class="cart-item-quantity">
                    <span class="cart-item-remove">✖</span>
                </div>
            `;

            giftCardElement.querySelector(".cart-item-remove").addEventListener("click", function() {
                removeGiftCardItem(item.code);
            });

            giftCardItemsContainer.appendChild(giftCardElement);

            totalPrice += item.amount;
        });

        totalPriceElement.textContent = `${totalPrice.toFixed(2)}₮`;
    }

    function removeGiftCardItem(giftCardCode) {
        const giftCardItems = getGiftCardItems();
        const updatedGiftCardItems = giftCardItems.filter(item => item.code !== giftCardCode);
        saveGiftCardItems(updatedGiftCardItems);
        displayGiftCardItems(updatedGiftCardItems);
    }

    function getGiftCardItems() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveGiftCardItems(giftCardItems) {
        localStorage.setItem("cart", JSON.stringify(giftCardItems));
    }

    // Function to share gift card via email
    function shareGiftCard(code, name, amount) {
        const subject = encodeURIComponent("You've received a gift card!");
        const body = encodeURIComponent(`Dear ${name},\n\nYou've received a gift card worth ${amount}₮. Use the following code to redeem it: ${code}\n\nBest regards,\nJag's Fashion`);
        const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    }

    // QR code scanning functionality
    function onScanSuccess(decodedText, decodedResult) {
        document.getElementById('qr-reader-results').innerHTML = `<p>Scanned Code: ${decodedText}</p>`;
    }

    function onScanError(errorMessage) {
        console.error(`QR Code Scan Error: ${errorMessage}`);
    }

    const html5QrCode = new Html5Qrcode("qr-reader", { willReadFrequently: true });
    html5QrCode.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
        },
        onScanSuccess,
        onScanError
    ).catch(err => {
        console.error(`Unable to start scanning: ${err}`);
    });

    // Display gift card items on page load
    displayGiftCardItems(getGiftCardItems());
    displayCartItems(getCartItems());
});
