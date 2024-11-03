import React, { useState, useEffect } from "react";

import BrowseCard from "../Components/BrowseCard";

function Browse(props) {
  const [menu, setMenu] = props.menuState;

  const [displayedMenu, setDisplayedMenu] = useState(menu);
  const [totalPrice, setTotalPrice] = props.totalPriceState;

  // const [cart, setCart] = props.cartState;

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
    <div className="Browse container py-4">
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Search..." onInput={searchInput}></input>
      </div>
      <p className="h4 mb-4">Browse</p>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <button className="btn btn-primary me-2" onClick={() => props.setCurrentPage("Browse")}>Browse</button>
          <button className="btn btn-secondary me-2" onClick={() => props.setCurrentPage("Cart")}>Cart</button>
          <button className="btn btn-success" onClick={() => props.setCurrentPage("Confirmation")}>Confirmation</button>
        </div>
      </nav>
      <div className="row">
        {displayedMenu.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <BrowseCard
              cartState={props.cartState}
              product={product}
              totalPriceState={[totalPrice, setTotalPrice]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Browse;
