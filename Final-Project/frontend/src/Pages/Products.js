import { useEffect, useState } from "react";
import AuctionCard from "../Components/AuctionCard";

let Products = (props) => {
  let [auctions, setAuctions] = useState([]);

  useEffect(() => {
    let getData = async () => {
      let response = await fetch("http://localhost:8081/auctions");
      let data = await response.json();
      setAuctions(data);
    };

    getData();
  }, []);

  return (
    <div>
      {auctions.map((auction) => (
        <AuctionCard setPage={props.setPage} key={auction.id} auction={auction} />
      ))}

      <div
        onClick={() => {
          props.setPage("UserHome");
        }}
      >
        Home
      </div>
    </div>
  );
};

export default Products;
