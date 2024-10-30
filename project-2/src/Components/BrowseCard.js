import React, { useState, useEffect } from "react";

function BaseComponent(props) {
  const [cart, setCart] = props.cartState;

  const [inCart, setInCart] = useState(0);

  let product = props.product;
  let addElementToCart = () => {
    setCart((prevCart) => {
      const newCart = [...prevCart, product.id];
      return newCart.sort((a, b) => a - b);
    });

    setInCart((prevInCart) => prevInCart + 1);
  };

  let removeElementFromCart = () => {
    // Only decrease inCart if the product was actually removed
    setInCart((prevInCart) => {
      const index = cart.indexOf(product.id);
      return index > -1 ? prevInCart - 1 : prevInCart;
    });

    setCart((prevCart) => {
      const index = prevCart.indexOf(product.id);
      if (index > -1) {
        // Create a new cart without the product id
        const newCart = [
          ...prevCart.slice(0, index),
          ...prevCart.slice(index + 1),
        ];
        // Sort the new cart
        return newCart.sort((a, b) => a - b);
      }
      return prevCart; // If the product id wasn't found, return the previous cart
    });
  };

  return (
    <div className="BaseComponent">
      <img src={product.image} alt="" />
      <p>{product.name}</p>

      <p>{product.id}</p>
      <p>In Cart: {inCart}</p>
      <button onClick={addElementToCart}>+1</button>
      <button onClick={removeElementFromCart}>-1</button>
    </div>
  );
}

export default BaseComponent;
