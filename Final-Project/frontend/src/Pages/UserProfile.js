import { useEffect, useState } from "react";
import NotificationCard from "../Components/NotificationCard";
let UserProfile = (props) => {
  let [notifications, setNotifications] = useState([]);
  let [newPassword, setNewPassword] = useState("");
  let [passwordErrorText, setPasswordErrorText] = useState("");
  let [deleteErrorText, setDeleteErrorText] = useState("");

  useEffect(() => {
    let getData = async () => {
      let response = await fetch("http://localhost:8081/users/notifications/" + localStorage.getItem("token"));
      let data = await response.json();
      setNotifications(data);
    };

    getData();
  });

  let changePassword = async () => {
    try {
      let response = await fetch("http://localhost:8081/users/changePassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("token"), password: newPassword }),
      });

      console.log(newPassword);

      if (response.ok) {
        alert("Password Changed!");
        props.setPage("UserHome");
      } else {
        let message = await response.text();
        setPasswordErrorText(message);
      }
    } catch (e) {
      setPasswordErrorText("An unexpected error occured, please try again");
    }
  };

  let tryDelete = async () => {
    try {
      let response = await fetch("http://localhost:8081/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });

      if (response.ok) {
        alert("Password Changed!");
        localStorage.removeItem("token");
        props.setPage("UserHome");
      } else {
        let message = await response.text();
        setDeleteErrorText(message);
      }
    } catch (e) {
      setDeleteErrorText("An unexpected error occured, please try again");
    }
  };

  let logout = () => {
    props.setPage("Login");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h1>Notifications: </h1>
      <div className="notifications">
        {notifications.map((notification) => {
          return <NotificationCard notification={notification}></NotificationCard>;
        })}
      </div>
      <hr />
      <h1>Change Password:</h1>
      <label htmlFor="password">New Password: </label>
      <input
        type="text"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
        id="password"
      />
      <button onClick={changePassword}>Change Password</button>
      {passwordErrorText && <p>{passwordErrorText}</p>}
      <hr />
      <button
        onClick={() => {
          props.setPage("UserHome");
        }}
      >
        Home
      </button>
      <br />
      <button onClick={logout}>Logout</button>
      <br />
      <button onClick={tryDelete}>Delete User</button>
      {deleteErrorText && <p>{deleteErrorText}</p>}
    </div>
  );
};

export default UserProfile;
