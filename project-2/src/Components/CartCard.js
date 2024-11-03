

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function CartCard(props) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={props.product.image} alt="" className="img-fluid rounded-start" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.product.name}</h5>
            <p className="card-text mb-1"><strong>Amount:</strong> {props.amount}</p>
            <p className="card-text"><strong>Price:</strong> ${props.product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
