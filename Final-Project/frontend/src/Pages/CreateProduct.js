import { useState } from "react";

let CreateProduct = (props) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [startPrice, setStartPrice] = useState("");
  let [daysActive, setDaysActive] = useState("");
  let [errorText, setErrorText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const payload = {
      title,
      description,
      startPrice,
      daysActive,
      token,
    };

    try {
      const response = await fetch("http://localhost:8081/auctions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Auction created successfully!");
        props.setPage("UserHome");
      } else {
        let message = await response.text();
        setErrorText(message);
      }
    } catch (error) {
      console.error("Error creating auction:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div>
      <h1>Create Auction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Starting Price:</label>
          <input type="number" value={startPrice} onChange={(e) => setStartPrice(e.target.value)} required />
        </div>
        <div>
          <label>Days Active:</label>
          <input type="number" value={daysActive} onChange={(e) => setDaysActive(e.target.value)} required />
        </div>
        <button type="submit">Create Auction</button>
        <button
          onClick={() => {
            props.setPage("UserHome");
          }}
        >
          Back
        </button>
        {errorText && <p>{errorText}</p>}
      </form>
    </div>
  );
};

export default CreateProduct;
