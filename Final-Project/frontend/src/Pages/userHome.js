import { useState, useEffect } from "react";

import AuctionCard from "../Components/AuctionCard";

let UserHome = (props) => {
  let [currentBids, setCurrentBids] = useState([]);
  let [outBid, setOutBid] = useState([]);
  let [myAuctions, setMyAuctions] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token") == undefined) {
      return props.setPage("Login");
    }

    let getData = async () => {
      const response = await fetch("http://localhost:8081/users/" + localStorage.getItem("token"));

      if (response.status === 404) {
        console.log("ERRORORRO");
        return props.setPage("Login");
      }

      let myProductsResponse = await fetch("http://localhost:8081/users/auctions/" + localStorage.getItem("token"));
      let res = await myProductsResponse.json();

      let products = res.auctions;
      setMyAuctions(products);

      let currentBidsResponse = await fetch("http://localhost:8081/users/myBids/" + localStorage.getItem("token"));
      res = await currentBidsResponse.json();
      let auctions = res.auctions;
      setCurrentBids(auctions);

      let getOutbidsIdsResponse = await fetch("http://localhost:8081/users/outbid/" + localStorage.getItem("token"));
      let auctionIds = await getOutbidsIdsResponse.json();

      let auctionsArr = [];

      for (let auctionId of auctionIds) {
        let getAuction = await fetch("http://localhost:8081/auctions/ " + auctionId);
        let res = await getAuction.json();
        auctionsArr.push(res);
      }
      setOutBid(auctionsArr);
    };

    getData();
  }, []);

  return (
    <div>
      <p>Your Auctions</p>
      {myAuctions.map((auction) => {
        console.log(auction);
        return <AuctionCard auction={auction}>{auction.title}</AuctionCard>;
      })}

      <p>Your Winning Bids</p>
      {currentBids.map((auction) => {
        console.log(auction);
        return <AuctionCard auction={auction}>{auction.title}</AuctionCard>;
      })}

      <p>You were outbid on the following products</p>
      {outBid.map((auction) => {
        console.log(auction);
        return <AuctionCard auction={auction}>{auction.title}</AuctionCard>;
      })}
    </div>
  );
};

export default UserHome;
