import React, { useEffect } from "react";

function Cart(props) {
  const [cart, setCart] = props.cartState;
  const [menu, setMenu] = props.menuState;

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
