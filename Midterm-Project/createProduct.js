formInputs = {};

let inputs = ["image", "title", "description", "endTime"];

for (let i = 0; i < inputs.length; i++) {
  formInputs[inputs[i]] = document.getElementById(inputs[i] + "-input");
}

let imageDisplay = document.getElementById("image-display");
let errorText = document.getElementById("error");

let createButton = document.getElementById("create");

formInputs.image.addEventListener("change", () => {
  let imageUrl = formInputs.image.value;
  if (imageUrl) {
    imageDisplay.src = imageUrl;
    imageDisplay.style.display = "block";
  } else {
    imageDisplay.style.display = "none";
  }
});

createButton.addEventListener("click", () => {
  let product = {};
  product.image = formInputs.image.value;
  product.title = formInputs.title.value;
  product.description = formInputs.description.value;
  const selectedOption =
    formInputs.endTime.options[formInputs.endTime.selectedIndex];
  let formattedStr = removeAfterSecondSpace(selectedOption.text);
  product.endTime = formattedStr;
  console.log(product);
  const hasNullValue = Object.values(product).some(
    (value) => value === "" || value === undefined
  );
  if (!hasNullValue) {
    let products = JSON.parse(localStorage.getItem("products"));
    products.push(product);
    let productsJson = JSON.stringify(products);
    localStorage.setItem("products", productsJson);
    window.location.href = "index.html";
  } else {
    errorText.innerText = "All information must be filled in!";
  }
});

let removeAfterSecondSpace = (str) => {
  const parts = str.split(" ");

  if (parts.length > 2) {
    return parts[0] + " " + parts[1];
  }

  return str;
};
