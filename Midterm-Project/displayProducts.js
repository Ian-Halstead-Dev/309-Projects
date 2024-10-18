// Function to load products from localStorage and display them
function displayProducts() {
  if (
    localStorage.getItem("products") == null ||
    JSON.parse(localStorage.getItem("products")).length == 0
  ) {
    const container = document.getElementById("products-container");

    let button = document.createElement("button");
    button.classList = "btn btn-primary btn-lg";
    button.onclick = async () => {
      await loadData();
      displayProducts();
    };
    button.innerText = "Load Data";
    container.innerHTML = "";
    container.appendChild(button);
    // displayProducts();
    // container.innerText = "eifjwsiojf";
    // alert("terst");
  } else {
    // Retrieve products from localStorage
    let dataStr = localStorage.getItem("products");
    let products = JSON.parse(dataStr) || [];

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
        <div class="card-footer d-flex justify-content-between">
          <a href="productDetails.html?id=${product.id}" class="btn btn-primary btn-sm">View Details</a>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
      </div>
    `;

      // Append the product card to the container
      container.appendChild(productCard);
    });
  }
}

// Function to delete a product by its ID
function deleteProduct(id) {
  // Retrieve products from localStorage
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Filter out the product with the specified ID
  products = products.filter((product) => product.id !== id);

  // Save the updated products list back to localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Refresh the displayed products
  displayProducts();
}

// Load products when the page loads
window.onload = displayProducts;
