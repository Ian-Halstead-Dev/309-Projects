import React, { useState } from "react";

function CartCard(props) {
  return (
    <div>
      <p>Item Image:</p>
      <img src={props.product.image} alt="" />

      <p>Title: {props.product.name}</p>

      <p>Amount: {props.amount}</p>
      <p>Price: {props.product.price}</p>
    </div>
  );
}

export default CartCard;
