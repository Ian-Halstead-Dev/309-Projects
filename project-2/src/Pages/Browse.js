import React, { useState, useEffect } from "react";

import BrowseCard from "../Components/BrowseCard";

function Browse(props) {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = props.cartState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("products.json");
        const result = await response.json();
        setMenu(result.menu);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
