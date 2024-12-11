import logo from "./logo.svg";
import "./Styles/App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserHome from "./Pages/userHome";
import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    let fetchData = async () => {
      try {
        let data = await fetch("http://localhost:8081/auctions");
        data = await data.json();
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <UserHome></UserHome>
    </div>
  );
}

export default App;
