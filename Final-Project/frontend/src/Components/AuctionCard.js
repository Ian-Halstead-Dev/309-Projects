import React from "react";

const AuctionCard = (props) => {
  return (
    <div style={styles.card}>
      <div style={styles.image}></div>
      <div style={styles.title}>{props.auction.title}</div>
      <div style={styles.price}>${(props.auction.curr_price / 100).toFixed(2)}</div>
      <button
        onClick={() => {
          props.setPage("Product/" + props.auction.id);
        }}
      >
        View
      </button>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #000",
    borderRadius: "10px",
    padding: "10px",
    width: "200px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  image: {
    height: "100px",
    width: "100px",
    backgroundColor: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
    borderRadius: "5px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  price: {
    fontSize: "16px",
    color: "green",
    marginBottom: "5px",
  },
  description: {
    fontSize: "14px",
    textAlign: "center",
    color: "#555",
  },
};

export default AuctionCard;
