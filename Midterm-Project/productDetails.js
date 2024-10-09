let data = getData();

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get("id");

let product = data.filter((product) => product.id === parseInt(id))[0];

let properties = ["image", "title", "description", "price", "endTime"];

for (let i = 0; i < properties.length; i++) {
  if (properties[i] === "image") {
    console.log(properties[i] + "-display");
    document.getElementById(properties[i] + "-display").src = product.image;
  } else {
    document.getElementById(properties[i] + "-display").innerText =
      product[properties[i]];
  }
}
