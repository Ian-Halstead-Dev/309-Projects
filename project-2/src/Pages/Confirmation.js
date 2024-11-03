// import React, { useState } from "react";

// function Confirmation(props) {
//   return (
//     <div className="Confirmation">
//       <p>Confirmation</p>
//       <button onClick={() => props.setCurrentPage("Browse")}>Browse</button>
//       <button onClick={() => props.setCurrentPage("Confirmation")}>Confirmation</button>
//       <button onClick={() => props.setCurrentPage("Cart")}>Cart</button>
//     </div>
//   );
// }

// import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Confirmation(props) {
//   const { formData } = props; // Ensure `formData` is passed as a prop

//   if (!formData) {
//     return <p>No data available. Please complete the form first.</p>;
//   }

//   return (
//     <div className="Confirmation container mt-4 bg-light p-4 rounded">
//       <h2 className="text-success mb-3">Confirmation</h2>
//       <div className="mb-3">
//         <button className="btn btn-primary me-2" onClick={() => props.setCurrentPage("Browse")}>Browse</button>
//         <button className="btn btn-success" onClick={() => props.setCurrentPage("Cart")}>Cart</button>
//         <button className="btn btn-secondary me-2" onClick={() => props.setCurrentPage("Confirmation")}>Confirmation</button>
//       </div>
//       <div className="confirmation-details p-3 border rounded bg-white">
//         <h4 className="text-info">Submitted Information:</h4>
//         <p><strong>Name:</strong> {formData.name}</p>
//         <p><strong>Email:</strong> {formData.email}</p>
//         <p><strong>Card:</strong> ****-****-****-{formData.card.slice(-4)}</p>
//         <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state}, {formData.zip}</p>
//         {formData.address2 && <p><strong>Address 2:</strong> {formData.address2}</p>}
//       </div>
//     </div>
//   );
// }

// export default Confirmation;
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Confirmation() {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  if (!formData) {
    return <div className="container mt-4 text-center">
      <div className="alert alert-warning" role="alert">Loading...</div>
    </div>;
  }

  return (
    <div className="Confirmation container py-4 bg-light rounded shadow-sm">
      <h2 className="text-success mb-4">Order Confirmation</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h4 className="card-title text-info">Submitted Information</h4>
          <p className="card-text"><strong>Name:</strong> {formData.name}</p>
          <p className="card-text"><strong>Email:</strong> {formData.email}</p>
          <p className="card-text"><strong>Address:</strong> {formData.address}</p>
          {formData.address2 && <p className="card-text"><strong>Address 2:</strong> {formData.address2}</p>}
          <p className="card-text"><strong>City:</strong> {formData.city}</p>
          <p className="card-text"><strong>State:</strong> {formData.state}</p>
          <p className="card-text"><strong>Zip Code:</strong> {formData.zip}</p>
          <p className="card-text"><strong>Total Price:</strong> ${formData.totalPrice}</p>
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary me-2" onClick={() => window.location.href = '/browse'}>Browse</button>
        <button className="btn btn-success me-2" onClick={() => window.location.href = '/cart'}>Cart</button>
        <button className="btn btn-secondary" onClick={() => window.location.href = '/confirmation'}>Confirmation</button>
      </div>
    </div>
  );
}

export default Confirmation;


