import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Browse from "./Pages/Browse";
import Cart from "./Pages/Cart";
import Confirmation from "./Pages/Confirmation";

function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState("browse");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("products.json");
        const result = await response.json();
        setMenu(result.menu);

        let cartArr = Array(result.menu.length).fill(0);
        setCart(cartArr);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  let renderPage = () => {
    if (currentPage.toLowerCase() == "browse") {
      return (
        <>
          <Browse
            cartState={[cart, setCart]}
            setCurrentPage={setCurrentPage}
            menuState={[menu, setMenu]}
          />
          {cart.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </>
      );
    } else if (currentPage.toLowerCase() == "cart") {
      return (
        <Cart
          cartState={[cart, setCart]}
          menuState={[menu, setMenu]}
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
