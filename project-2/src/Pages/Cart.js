// import React, { useState } from "react";
// import CartCard from "../Components/CartCard";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Cart(props) {
//   const [cart, setCart] = props.cartState;
//   const [menu, setMenu] = props.menuState;

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [card, setCard] = useState("");
//   const [address, setAddress] = useState("");
//   const [address2, setAddress2] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zip, setZip] = useState("");

//   const [errorText, setErrorText] = useState("");

//   const [totalPrice, setTotalPrice] = props.totalPriceState;

//   const submitForm = (e) => {
//     e.preventDefault();

//     if (!email.match(/^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
//       setErrorText("Please enter a valid email address");
//       return;
//     }
//     if (!card.match(/^(?:\d{4}[-\s]?){3}\d{4}$/)) {
//       setErrorText("Please enter a valid card");
//       return;
//     }

//     if (!zip.match(/^\d{5}$/)) {
//       setErrorText("Please enter a valid zip");
//       return;
//     }

//     if (name == "" || address == "" || city == "" || state == "") {
//       setErrorText("All data is required except for Address 2");
//       return;
//     }
//   };

//   const displayCart = () => {
//     let displayedJsx = [];
//     for (let i = 0; i < cart.length; i++) {
//       if (cart[i] !== 0) {
//         displayedJsx.push(
//           <CartCard product={menu[i]} amount={cart[i]} key={i} />
//         );
//       }
//     }
//     return displayedJsx;
//   };

//   return (
//     <div className="Cart container py-4">
//       <h2 className="mb-4">Cart</h2>
//       <div className="mb-3 d-flex justify-content-between">
//         <button className="btn btn-primary" onClick={() => props.setCurrentPage("Browse")}>Browse</button>
//         <button className="btn btn-secondary" onClick={() => props.setCurrentPage("Cart")}>Cart</button>
//         <button className="btn btn-success" onClick={() => props.setCurrentPage("Confirmation")}>Confirmation</button>
//       </div>
//       <div className="row mb-4">
//         {displayCart()}
//       </div>
//       <p className="h5">Total: ${totalPrice}</p>

//       <form className="mt-4" >
//         <div className="mb-3">
//           <label className="form-label">Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={(e) => {
//               setName(e.target.value);
//               setErrorText("");
//             }}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email:</label>
//           <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setErrorText("");
//             }}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Card:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={card}
//             onChange={(e) => {
//               setCard(e.target.value);
//               setErrorText("");
//             }}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Address:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={address}
//             onChange={(e) => {
//               setAddress(e.target.value);
//               setErrorText("");
//             }}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Address 2:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={address2}
//             onChange={(e) => {
//               setAddress2(e.target.value);
//               setErrorText("");
//             }}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">City:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={city}
//             onChange={(e) => {
//               setCity(e.target.value);
//               setErrorText("");
//             }}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">State:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={state}
//             onChange={(e) => {
//               setState(e.target.value);
//               setErrorText("");
//             }}
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Zip Code:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={zip}
//             onChange={(e) => {
//               setZip(e.target.value);
//               setErrorText("");
//             }}
//           />
//         </div>

//         <p className="text-danger">{errorText}</p>

//         <button type="submit" className="btn btn-success" onClick={submitForm}>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Cart;
import React, { useState } from "react";
import CartCard from "../Components/CartCard";
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart(props) {
  const [cart, setCart] = props.cartState;
  const [menu, setMenu] = props.menuState;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [card, setCard] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [errorText, setErrorText] = useState("");

  const [totalPrice, setTotalPrice] = props.totalPriceState;

  const submitForm = (e) => {
    e.preventDefault();

    if (!email.match(/^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setErrorText("Please enter a valid email address");
      return;
    }
    if (!card.match(/^(?:\d{4}[-\s]?){3}\d{4}$/)) {
      setErrorText("Please enter a valid card");
      return;
    }

    if (!zip.match(/^\d{5}$/)) {
      setErrorText("Please enter a valid zip");
      return;
    }

    if (name === "" || address === "" || city === "" || state === "") {
      setErrorText("All data is required except for Address 2");
      return;
    }

    // Store data in localStorage for later use
    const formData = {
      name,
      email,
      card,
      address,
      address2,
      city,
      state,
      zip,
      totalPrice
    };

    localStorage.setItem("formData", JSON.stringify(formData));
    
    // Navigate to the confirmation page
    props.setCurrentPage("Confirmation");
  };

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

  return (
    <div className="Cart container py-4">
      <h2 className="mb-4 d-f">Cart</h2>
      <div className="mb-3 d-flex justify-content-between">
        <button className="btn btn-primary" onClick={() => props.setCurrentPage("Browse")}>Browse</button>
        <button className="btn btn-secondary" onClick={() => props.setCurrentPage("Cart")}>Cart</button>
        <button className="btn btn-success" onClick={() => props.setCurrentPage("Confirmation")}>Confirmation</button>
      </div>
      <div className="row mb-4">
        {displayCart()}
      </div>
      <p className="h5">Total: ${totalPrice}</p>

      <form className="mt-4" >
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorText("");
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorText("");
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Card:</label>
          <input
            type="text"
            className="form-control"
            value={card}
            onChange={(e) => {
              setCard(e.target.value);
              setErrorText("");
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setErrorText("");
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address 2:</label>
          <input
            type="text"
            className="form-control"
            value={address2}
            onChange={(e) => {
              setAddress2(e.target.value);
              setErrorText("");
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setErrorText("");
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">State:</label>
          <input
            type="text"
            className="form-control"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setErrorText("");
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Zip Code:</label>
          <input
            type="text"
            className="form-control"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value);
              setErrorText("");
            }}
          />
        </div>

        <p className="text-danger">{errorText}</p>

        <button type="submit" className="btn btn-success" onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
}

export default Cart;
