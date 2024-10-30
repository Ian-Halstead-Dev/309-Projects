import React, { useState, useEffect } from "react";

function BaseComponent(props) {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div className="BaseComponent">
      <p>{props.product.name}</p>
    </div>
  );
}

export default BaseComponent;
