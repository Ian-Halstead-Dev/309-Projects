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
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 
      py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1
            className="text-4xl font-extrabold text-gray-900 
            tracking-tight sm:text-5xl lg:text-6xl"
          >
            Your Auction Dashboard
          </h1>
          <p className="mt-4 text-xl text-gray-600">Track your auction activities and bidding status</p>
        </header>

        {/* Your Auctions Section */}
        <section
          className="bg-white shadow-lg rounded-2xl p-6 
          transform transition-all hover:shadow-xl"
        >
          <h2
            className="text-2xl font-bold text-gray-800 
            mb-6 border-b pb-3 border-gray-200"
          >
            Your Auctions
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
            gap-6 animate-fade-in"
          >
            {myAuctions.length > 0 ? (
              myAuctions.map((auction) => (
                <AuctionCard
                  key={auction.id}
                  auction={auction}
                  setPage={props.setPage}
                  isOwner={true}
                  className="transition-all duration-300 
                    hover:scale-105 hover:shadow-2xl"
                >
                  {auction.title}
                </AuctionCard>
              ))
            ) : (
              <div
                className="col-span-full text-center 
                text-gray-500 italic py-10"
              >
                No auctions created yet. Start selling!
              </div>
            )}
          </div>
        </section>

        {/* Your Winning Bids Section */}
        <section
          className="bg-white shadow-lg rounded-2xl p-6 
          transform transition-all hover:shadow-xl"
        >
          <h2
            className="text-2xl font-bold text-gray-800 
            mb-6 border-b pb-3 border-gray-200"
          >
            Your Winning Bids
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
            gap-6 animate-fade-in"
          >
            {currentBids.length > 0 ? (
              currentBids.map((auction) => (
                <AuctionCard
                  key={auction.id}
                  auction={auction}
                  setPage={props.setPage}
                  className="transition-all duration-300 
                    hover:scale-105 hover:shadow-2xl"
                >
                  {auction.title}
                </AuctionCard>
              ))
            ) : (
              <div
                className="col-span-full text-center 
                text-gray-500 italic py-10"
              >
                You haven't won any bids yet. Keep bidding!
              </div>
            )}
          </div>
        </section>

        {/* Outbid Auctions Section */}
        <section
          className="bg-white shadow-lg rounded-2xl p-6 
          transform transition-all hover:shadow-xl"
        >
          <h2
            className="text-2xl font-bold text-gray-800 
            mb-6 border-b pb-3 border-gray-200"
          >
            You Were Outbid
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
            gap-6 animate-fade-in"
          >
            {outBid.length > 0 ? (
              outBid.map((auction) => (
                <AuctionCard
                  key={auction.id}
                  auction={auction}
                  setPage={props.setPage}
                  className="transition-all duration-300 
                    hover:scale-105 hover:shadow-2xl"
                >
                  {auction.title}
                </AuctionCard>
              ))
            ) : (
              <div
                className="col-span-full text-center 
                text-gray-500 italic py-10"
              >
                You haven't been outbid on any items. Great job!
              </div>
            )}
          </div>
        </section>
        <button onClick={() => props.setPage("Products")}>Products</button>
        <button onClick={() => props.setPage("CreateProduct")}>Create Product</button>
        <button onClick={() => props.setPage("UserProfile")}>Profile</button>
      </div>
    </div>
  );
};

export default UserHome;
