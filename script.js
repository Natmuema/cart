// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart'); 
let closeCart = document.querySelector('#close-cart');

// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready() {
    // Remove Items From Cart
    let removeCartButtons = document.getElementsByClassName("cart-remove");
    for (let button of removeCartButtons) {
        button.addEventListener("click", removeCartItem);
    }

    // Add to Cart Buttons
    let addCartButtons = document.getElementsByClassName("add-cart");
    for (let button of addCartButtons) {
        button.addEventListener("click", addToCart);
    }

    // Quantity Change
    let quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let input of quantityInputs) {
        input.addEventListener("change", quantityChanged);
    }
}

// Remove Items From Cart
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity Change
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add To Cart
function addToCart(event) {
    let button = event.target;
    let product = button.parentElement;
    let title = product.querySelector(".product-title").innerText;
    let price = product.querySelector(".price").innerText;
    let productImg = product.querySelector(".product-img").src;

    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    let cartContent = document.querySelector(".cart-content");
    let cartItems = cartContent.getElementsByClassName("cart-product-title");

    for (let item of cartItems) {
        if (item.innerText === title) {
            alert("This item is already added to the cart");
            return;
        }
    }

    let cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;
    cartContent.appendChild(cartBox);

    // Add event listeners for remove button and quantity change
    cartBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
    cartBox.querySelector(".cart-quantity").addEventListener("change", quantityChanged);
}

// Update Total
function updateTotal() {
    let cartContent = document.querySelector(".cart-content");
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for (let cartBox of cartBoxes) {
        let priceElement = cartBox.querySelector(".cart-price");
        let quantityElement = cartBox.querySelector(".cart-quantity");
        let price = parseFloat(priceElement.innerText.replace("Ksh", ""));
        let quantity = quantityElement.value;
        total += price * quantity;
    }
    document.querySelector(".total-price").innerText = "Ksh " + total;
}
