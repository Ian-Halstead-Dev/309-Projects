import { useState } from "react";

const AuctionCard = ({ auction, setPage, isOwner }) => {
  let [errorText, setErrorText] = useState("");
  const deleteAuction = async () => {
    let response = await fetch("http://localhost:8081/auctions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token"), id: auction.id }),
    });

    if (!response.ok) {
      let message = await response.text();
      if (message) {
        setErrorText(message);
      } else {
        setErrorText("An unexpected error occurred. Please try again");
      }
    } else {
      window.location.reload();
    }
  };

  // Destructure auction object with default values to prevent undefined errors
  const { title = "Auction Title", curr_price = 0, description = "Description goes here", imageUrl = null } = auction || {};

  return (
    <div className="max-w-xs transform transition-all duration-300 hover:-translate-y-1 m-4 group">
      <div
        className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 
        hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Image Container */}
        <div
          className="h-48 bg-gradient-to-br from-blue-50 to-indigo-50 
          flex items-center justify-center border-b border-gray-100 relative"
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="max-w-full max-h-full object-contain 
                transition-transform group-hover:scale-105"
            />
          ) : (
            <div
              className="w-32 h-32 bg-white rounded-xl shadow-inner 
              animate-pulse flex items-center justify-center"
            >
              <span className="text-gray-400 text-sm">Item Image</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-5 space-y-3">
          {/* Title with hover effect */}
          <h3
            className="text-xl font-bold text-gray-800 
            hover:text-blue-600 transition-colors 
            decoration-blue-400 decoration-2 hover:underline 
            truncate cursor-pointer"
          >
            {title}
          </h3>

          {/* Price Tag Design with responsive sizing */}
          <div
            className="inline-block bg-emerald-50 rounded-lg 
            px-3 py-1.5 border-2 border-emerald-200 
            transform transition-transform hover:scale-105"
          >
            <span className="text-xl md:text-2xl font-bold text-emerald-600">${(curr_price / 100).toFixed(2)}</span>
          </div>

          {/* Description with improved readability */}
          <p
            className="text-gray-600 text-sm line-clamp-2 
            border-l-4 border-gray-200 pl-3 
            italic opacity-90 hover:opacity-100 transition-opacity"
          >
            {description}
          </p>

          {/* Action Button with enhanced interactivity */}
          <button
            className="w-full mt-4 py-3 px-4 
            bg-blue-500 text-white font-semibold rounded-xl 
            hover:bg-blue-600 active:bg-blue-700 
            transform active:scale-95 
            transition-all duration-200 
            flex items-center justify-center 
            group/button"
            onClick={() => {
              setPage("Product/" + auction.id);
            }}
          >
            <span className="transition-transform group-active/button:-translate-y-0.5">View Details</span>
          </button>
        </div>

        {isOwner && <button onClick={deleteAuction}>Delete</button>}
        {errorText && <p>{errorText}</p>}
      </div>
    </div>
  );
};

export default AuctionCard;
