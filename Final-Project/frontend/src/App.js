import "./Styles/App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserHome from "./Pages/userHome";
import Products from "./Pages/Products";
import Product from "./Pages/Product";
import CreateProduct from "./Pages/CreateProduct";
import UserProfile from "./Pages/UserProfile";

import { useState, useEffect } from "react";

function App() {
  const [currentPage, setPage] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setPage("UserHome");
    } else {
      setPage("Login");
    }
  }, []);

  return (
    <div className="App">
      {(() => {
        if (!currentPage) {
          return <Login setPage={setPage} />;
        }
        let currentPageProcessed = currentPage.split("/")[0];
        switch (currentPageProcessed) {
          case "UserHome":
            return <UserHome setPage={setPage} />;
          case "Login":
            return <Login setPage={setPage} />;
          case "Signup":
            return <Signup setPage={setPage} />;
          case "Products":
            return <Products setPage={setPage} />;
          case "Product":
            return <Product setPage={setPage} auctionId={currentPage.split("/")[1]}></Product>;
          case "CreateProduct":
            return <CreateProduct setPage={setPage}></CreateProduct>;
          case "UserProfile":
            return <UserProfile setPage={setPage}></UserProfile>;

          default:
            return <div>Loading...</div>; // Optional loading state
        }
      })()}
    </div>
  );
}

export default App;
