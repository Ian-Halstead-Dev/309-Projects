import React, { useState } from "react";

function Confirmation(props) {
  return (
    <div className="Confirmation">
      <p>Confirmation</p>
      <button onClick={() => props.setCurrentPage("Browse")}>Browse</button>
      <button onClick={() => props.setCurrentPage("Confirmation")}>
        Confirmation
      </button>
      <button onClick={() => props.setCurrentPage("Cart")}>Cart</button>
    </div>
  );
}

export default Confirmation;
