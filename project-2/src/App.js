import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Browse from "./Pages/Browse";
import Cart from "./Pages/Cart";
import Confirmation from "./Pages/Confirmation";

function App() {
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState("browse");

  let renderPage = () => {
    if (currentPage.toLowerCase() == "browse") {
      return (
        <>
          <Browse cartState={[cart, setCart]} setCurrentPage={setCurrentPage} />
          {cart.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </>
      );
    } else if (currentPage.toLowerCase() == "cart") {
      return (
        <Cart
          cartState={[cart, setCart]}
          setCurrentPage={setCurrentPage}
        ></Cart>
      );
    } else if (currentPage.toLowerCase() == "confirmation") {
      return (
        <Confirmation
          cartState={[cart, setCart]}
          setCurrentPage={setCurrentPage}
        ></Confirmation>
      );
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
