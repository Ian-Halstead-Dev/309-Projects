// Function to load products from localStorage and display them
let displayProducts = async () => {
  // Retrieve products from localStorage
  let dataStr = await fetch("./data.json");
  let products = await dataStr.json();

  // Get the container where products will be displayed
  const container = document.getElementById("products-container");

  // Clear the container
  container.innerHTML = "";

  // Display each product using Bootstrap cards
  products.forEach((product) => {
    // Create a Bootstrap card for each product
    const productCard = document.createElement("div");
    productCard.className = "col-md-4 mb-4";

    productCard.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text"><strong>Current Bid:</strong> $${product.price}</p>
          <p class="card-text"><strong>End Time:</strong> ${product.endTime}</p>
        </div>

      </div>
    `;

    // Append the product card to the container
    container.appendChild(productCard);
  });
};

// Load products when the page loads
window.onload = (async () => {
  await displayProducts();
})();
