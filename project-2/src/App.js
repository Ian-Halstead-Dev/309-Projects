import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Browse from "./Pages/Browse";
import Cart from "./Pages/Cart";
import Confirmation from "./Pages/Confirmation";

function App() {
  const [currentPage, setCurrentPage] = useState("browse");

  let renderPage = () => {
    if (currentPage.toLowerCase() == "browse") {
      return <Browse setCurrentPage={setCurrentPage}></Browse>;
    } else if (currentPage.toLowerCase() == "cart") {
      return <Cart setCurrentPage={setCurrentPage}></Cart>;
    } else if (currentPage.toLowerCase() == "confirmation") {
      return <Confirmation setCurrentPage={setCurrentPage}></Confirmation>;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
