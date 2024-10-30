import React, { useState } from "react";

function Cart(props) {
  return (
    <div className="Cart">
      <p>Cart</p>
      <button onClick={() => props.setCurrentPage("Browse")}>Browse</button>
      <button onClick={() => props.setCurrentPage("Confirmation")}>
        Confirmation
      </button>
      <button onClick={() => props.setCurrentPage("Cart")}>Cart</button>
    </div>
  );
}

export default Cart;
