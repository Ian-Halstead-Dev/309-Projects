let loadData = async () => {
  let dataBad = await fetch("products.json");
  let data = await dataBad.json();
  localStorage.setItem("products", JSON.stringify(data));
};

loadData();
