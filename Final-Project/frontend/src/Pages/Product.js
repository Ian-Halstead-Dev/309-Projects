import { useState, useEffect } from "react";

let Product = (props) => {
  let [product, setProduct] = useState({});
  let [errorText, setErrorText] = useState("");
  let [priceInput, setPriceInput] = useState();
  useEffect(() => {
    let getData = async () => {
      let response = await fetch("http://localhost:8081/auctions/" + props.auctionId);
      let data = await response.json();
      setProduct(data);
    };

    getData();
  }, []);

  let placeBid = async () => {
    if (!priceInput) return setErrorText("Please enter a price!");

    let response = await fetch("http://localhost:8081/auctions/bid", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token"), bidId: props.auctionId, bidAmount: priceInput }),
    });

    console.log(response);

    if (response.ok) {
      alert("Bid Placed!");
      props.setPage("UserHome");
    } else if (response.status === 400) {
      let errorMessage = await response.text();
      console.log(errorMessage);
      if (errorMessage.includes("bidAmount must be greater")) {
        setErrorText("Bid amount must be greater than current price");
      } else {
        setErrorText("Unknown Error Please try again");
      }
    }
  };

  return (
    <div>
      <p>{product.title}</p>
      <p>{product.description}</p>
      <p>${(product.curr_price / 100).toFixed(2)}</p>
      <p>Owner: {product.owner}</p>
      <p>Current Winner: {product.currentWinner ? product.currentWinner : "Nobody!"}</p>
      <p>Days Remaining: {product.days_remaining}</p>

      <label htmlFor="priceInput">My Bid: </label>
      <input
        id="priceInput"
        type="number"
        onChange={(e) => {
          setPriceInput(e.target.value);
          setErrorText("");
        }}
      />
      <button onClick={placeBid}> Place Bid</button>
      {errorText && <p>{errorText}</p>}
      <br />
      <button>Return Home</button>
    </div>
  );
};

export default Product;
