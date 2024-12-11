import { useState } from "react";

let CreateProduct = (props) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [startPrice, setStartPrice] = useState("");
  let [daysActive, setDaysActive] = useState("");
  let [errorText, setErrorText] = useState("");
  let [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // Create FormData object for multipart data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startPrice", startPrice);
    formData.append("daysActive", daysActive);
    formData.append("image", image); // Append the image file
    formData.append("token", token);
    try {
      const response = await fetch("http://localhost:8081/auctions/" + token, {
        method: "POST",
        Authorization: `Bearer ${token}`,
        body: formData, // Send FormData directly
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
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
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
