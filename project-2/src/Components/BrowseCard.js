import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

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
    <div className="BaseComponent card mb-2" style={{ maxWidth: '40vw',justifySelf:'center' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={product.image} alt={product.name} className="img-fluid rounded-start" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">ID: {product.id}</p>
            <p className="card-text">In Cart: {cart[product.id - 1]}</p>
            <div className="d-flex justify-content-between mb-2">
              <button className="btn btn-danger" onClick={removeElementFromCart}>-1</button>
              <button className="btn btn-success" onClick={addElementToCart}>+1</button>
            </div>
            <p className="card-text"><strong>Price: </strong>${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaseComponent;
