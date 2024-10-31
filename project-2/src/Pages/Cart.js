import React, { useState } from "react";
import CartCard from "../Components/CartCard";

function Cart(props) {
  const [cart, setCart] = props.cartState;
  const [menu, setMenu] = props.menuState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [errorText, setErrorText] = useState("");

  const [totalPrice, setTotalPrice] = props.totalPriceState;

  const submitForm = (e) => {
    e.preventDefault();

    if (!email.match(/^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setErrorText("Please enter a valid email address");
      return;
    }
    if (!card.match(/^(?:\d{4}[-\s]?){3}\d{4}$/)) {
      setErrorText("Please enter a valid card");
      return;
    }

    if (!zip.match(/^\d{5}$/)) {
      setErrorText("Please enter a valid zip");
      return;
    }

    if (name == "" || address == "" || city == "" || state == "") {
      setErrorText("All data is required except for Address 2");
      return;
    }
  };

  const displayCart = () => {
    let displayedJsx = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] !== 0) {
        displayedJsx.push(
          <CartCard product={menu[i]} amount={cart[i]} key={i} />
        );
      }
    }
    return displayedJsx;
  };

  return (
    <div className="Cart">
      <p>Cart</p>
      <button onClick={() => props.setCurrentPage("Browse")}>Browse</button>
      <button onClick={() => props.setCurrentPage("Confirmation")}>
        Confirmation
      </button>
      <button onClick={() => props.setCurrentPage("Cart")}>Cart</button>
      {displayCart()}
      <p>Total: {totalPrice}</p>

      <div className="form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorText("");
            }}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorText("");
            }}
          />
        </label>

        <label>
          Card:
          <input
            type="text"
            value={card}
            onChange={(e) => {
              setCard(e.target.value);
              setErrorText("");
            }}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setErrorText("");
            }}
          />
        </label>

        <label>
          Address 2:
          <input
            type="text"
            value={address2}
            onChange={(e) => {
              setAddress2(e.target.value);
              setErrorText("");
            }}
          />
        </label>

        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setErrorText("");
            }}
          />
        </label>

        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setErrorText("");
            }}
          />
        </label>

        <label>
          Zip Code:
          <input
            type="text"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value);
              setErrorText("");
            }}
          />
        </label>

        <p className="error">{errorText}</p>

        <input type="submit" onClick={submitForm} />
      </div>
    </div>
  );
}

export default Cart;
