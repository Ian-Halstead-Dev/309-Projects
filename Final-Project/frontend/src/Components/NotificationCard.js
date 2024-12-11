let NotificationCard = (props) => {
  let deleteNotif = async () => {
    let response = await fetch("http://localhost:8081/users/notification", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("token"), id: props.notification.id }),
    });
    alert("Deleted notification");
    window.location.reload();
  };
  return (
    <div>
      <p>{props.notification.message}</p>
      <button onClick={deleteNotif}>Delete</button>
      <br />
      <br />
    </div>
  );
};

export default NotificationCard;
