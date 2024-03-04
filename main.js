document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  const cartCountElement = document.getElementById('cart-count');
  const cartTotalElement = document.getElementById('cart-total');

  let cartItems = [];
  let total = 0;

  addToCartButtons.forEach(button => {
      button.addEventListener('click', addToCart);
  });

  function addToCart(event) {
      const productElement = event.target.closest('.product');
      const productId = productElement.dataset.id;
      const productName = productElement.dataset.name;
      const productPrice = parseFloat(productElement.dataset.price);

      const existingItem = cartItems.find(item => item.id === productId);

      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cartItems.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
      }

      updateCart();
  }

  function updateCart() {
      cartItemsContainer.innerHTML = '';
      total = 0;

      cartItems.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;

          const quantityInput = document.createElement('input');
          quantityInput.type = 'number';
          quantityInput.value = item.quantity;
          quantityInput.min = 1;
          quantityInput.addEventListener('input', (event) => updateQuantity(item.id, event.target.value));

          listItem.appendChild(quantityInput);
          cartItemsContainer.appendChild(listItem);

          total += item.price * item.quantity;
      });

      totalElement.textContent = `Сумма: $${total.toFixed(2)}`;
      updateCartInfo();
  }

  function updateQuantity(productId, newQuantity) {
      const product = cartItems.find(item => item.id === productId);
      product.quantity = parseInt(newQuantity, 10) || 1;
      updateCart();
  }



  function updateCartInfo() {
      const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

      cartCountElement.textContent = itemCount;
      cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
});
