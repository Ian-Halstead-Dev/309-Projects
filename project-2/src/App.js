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

  let userDataObj = {
    name: "",
    email: "",
    card: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  };

  const [userData, setUserData] = useState(userDataObj);

  const [displayedUserData, setDisplayedUserData] = useState();

  useEffect(() => {
    let displayedUserDataJson = userData;
    displayedUserDataJson.card = "X".repeat(12) + userData.card.slice(12);
    setDisplayedUserData(displayedUserDataJson);
  }, [userData]);

  const [totalPrice, setTotalPrice] = useState(0);

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
            totalPriceState={[totalPrice, setTotalPrice]}
          />
        </>
      );
    } else if (currentPage.toLowerCase() == "cart") {
      return (
        <Cart
          cartState={[cart, setCart]}
          menuState={[menu, setMenu]}
          setCurrentPage={setCurrentPage}
          totalPriceState={[totalPrice, setTotalPrice]}
        ></Cart>
      );
    } else if (currentPage.toLowerCase() == "confirmation") {
      return (
        <Confirmation
          cartState={[cart, setCart]}
          setCurrentPage={setCurrentPage}
          totalPriceState={[totalPrice, setTotalPrice]}
          menuState={[menu, setMenu]}
        ></Confirmation>
      );
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
