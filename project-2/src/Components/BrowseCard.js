import React, { useState, useEffect } from "react";

function BaseComponent(props) {
  const [cart, setCart] = props.cartState;
  const [totalPrice, setTotalPrice] = props.totalPriceState;

  let product = props.product;
  let addElementToCart = () => {
    setCart((prevCart) => {
      let cartArr = [...prevCart];
      cartArr[product.id - 1] = cartArr[product.id - 1] + 1;
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + parseFloat(props.product.price)
      );
      return cartArr;
    });
  };

  let removeElementFromCart = () => {
    setCart((prevCart) => {
      let cartArr = [...prevCart];
      if (cartArr[product.id - 1] > 0) {
        cartArr[product.id - 1] = cartArr[product.id - 1] - 1;
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - parseFloat(props.product.price)
        );
        return cartArr;
      }
      return cartArr;
    });
  };

  return (
    <div className="BaseComponent">
      <img src={product.image} alt="" />
      <p>{product.name}</p>

      <p>{product.id}</p>
      <p>In Cart: {cart[product.id - 1]}</p>
      <button onClick={addElementToCart}>+1</button>
      <button onClick={removeElementFromCart}>-1</button>
      <p>Price: {product.price}</p>
    </div>
  );
}

export default BaseComponent;
