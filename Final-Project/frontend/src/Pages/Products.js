import { useEffect, useState } from "react";

let Products = () => {
  let [auctions, setAuctions] = useState([]);

  useEffect(() => {
    let getData = async () => {
      let response = await fetch("http://localhost:8081/auctions");
      let data = await response.json();
    };

    getData();
  }, []);
};
