import React, { useState, useEffect } from "react";

function Cart(props) {
  const [cart, setCart] = props.cartState;
  const [menu, setMenu] = props.menuState;

  let displayCart = () => {
    const arr = Array(menu.length).fill(0);
    for (let i = 0; i < cart.length; i++) {
      arr[cart[i].id - 1]++;
    }

    console.log(arr);
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
    </div>
  );
}

export default Cart;
