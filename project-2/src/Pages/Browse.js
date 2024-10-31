import React, { useState, useEffect } from "react";

import BrowseCard from "../Components/BrowseCard";

function Browse(props) {
  const [menu, setMenu] = props.menuState;

  const [displayedMenu, setDisplayedMenu] = useState(menu);

  const [cart, setCart] = props.cartState;

  useEffect(() => {
    setDisplayedMenu(menu);
  }, [menu]);

  let searchInput = (e) => {
    setDisplayedMenu(
      menu.filter((menuItem) => {
        return menuItem.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      })
    );
  };

  return (
    <div className="Browse">
      <input type="text" onInput={searchInput}></input>
      <p>Browse</p>
      <button onClick={() => props.setCurrentPage("Browse")}>Browse</button>
      <button onClick={() => props.setCurrentPage("Confirmation")}>
        Confirmation
      </button>
      <button onClick={() => props.setCurrentPage("Cart")}>Cart</button>
      {displayedMenu.map((product) => (
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
