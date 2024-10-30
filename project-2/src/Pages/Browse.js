import React, { useState, useEffect } from "react";

import BrowseCard from "../Components/BrowseCard";

function Browse(props) {
  const [menu, setMenu] = props.menuState;

  const [cart, setCart] = props.cartState;

  return (
    <div className="Browse">
      <p>Browse</p>
      <button onClick={() => props.setCurrentPage("Browse")}>Browse</button>
      <button onClick={() => props.setCurrentPage("Confirmation")}>
        Confirmation
      </button>
      <button onClick={() => props.setCurrentPage("Cart")}>Cart</button>
      {menu.map((product) => (
        <BrowseCard
          cartState={props.cartState}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default Browse;
