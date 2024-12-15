document.addEventListener("DOMContentLoaded", function() {
    function updateName(cardId) {
        var name = document.getElementById('name-input-' + cardId).value;
        document.getElementById('name-placeholder-' + cardId).textContent = name;
    }

    // Add event listeners for each input field
    const inputIds = ['50000', '100000', '200000', '300000', '500000', '1000000'];
    inputIds.forEach(id => {
        const inputElement = document.getElementById('name-input-' + id);
        if (inputElement) {
            inputElement.addEventListener('input', function() {
                updateName(id);
            });
        }
    });

    // Function to add gift card to cart
    function addToCart(giftCardCode, amount) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const name = document.getElementById('name-input-' + giftCardCode).value;
        cart.push({ code: giftCardCode, amount: amount, name: name });
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'cart.html';
    }

    // Expose the addToCart function to the global scope
    window.addToCart = addToCart;
});
