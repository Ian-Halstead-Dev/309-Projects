let getData = () => {
  let dataStr = localStorage.getItem("products");
  let dataJson = JSON.parse(dataStr);
  return dataJson;
};
