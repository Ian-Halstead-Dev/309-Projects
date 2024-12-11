import logo from "./logo.svg";
import "./Styles/App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import UserHome from "./Pages/userHome";
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
        switch (currentPage) {
          case "UserHome":
            return <UserHome setPage={setPage} />;
          case "Login":
            return <Login setPage={setPage} />;
          case "Signup":
            return <Signup setPage={setPage} />;
          default:
            return <div>Loading...</div>; // Optional loading state
        }
      })()}
    </div>
  );
}

export default App;
