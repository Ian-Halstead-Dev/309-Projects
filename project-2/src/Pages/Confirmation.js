import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import CartCard from "../Components/CartCard";

function Confirmation(props) {
  const [formData, setFormData] = useState(null);
  const [cart, setCart] = props.cartState;
  const [menu, setMenu] = props.menuState;

  const displayCart = () => {
    let displayedJsx = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] !== 0) {
        displayedJsx.push(
          <CartCard product={menu[i]} amount={cart[i]} key={i} />
        );
      }
    }
    return displayedJsx;
  };

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  if (!formData) {
    return (
      <div className="container mt-4 text-center">
        <div className="alert alert-warning" role="alert">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="Confirmation container py-4 bg-light rounded shadow-sm">
      <h2 className="text-success mb-4">Order Confirmation</h2>
      <div className="card mb-3">
        <div className="card-body">
          <div className="row mb-4">{displayCart()}</div>

          <h4 className="card-title text-info">Submitted Information</h4>
          <p className="card-text">
            <strong>Name:</strong> {formData.name}
          </p>
          <p className="card-text">
            <strong>Email:</strong> {formData.email}
          </p>
          <p className="card-text">
            <strong>Address:</strong> {formData.address}
          </p>
          {formData.address2 && (
            <p className="card-text">
              <strong>Address 2:</strong> {formData.address2}
            </p>
          )}
          <p className="card-text">
            <strong>City:</strong> {formData.city}
          </p>
          <p className="card-text">
            <strong>State:</strong> {formData.state}
          </p>
          <p className="card-text">
            <strong>Zip Code:</strong> {formData.zip}
          </p>
          <p className="card-text">
            <strong>Total Price:</strong> ${formData.totalPrice}
          </p>
        </div>
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary me-2"
          onClick={() => (window.location.href = "/browse")}
        >
          Browse
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
