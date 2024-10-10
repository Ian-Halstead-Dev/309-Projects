let convertTo24Hour = (timeStr) => {
  // Create a new date object initialized with a time string in 12-hour format
  const timeParts = timeStr.split(":");
  let hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const seconds = parseInt(timeParts[2].split(" ")[0], 10);
  const meridian = timeParts[2].split(" ")[1];

  // Convert hours to 24-hour format
  if (meridian === "PM" && hours < 12) {
    hours += 12;
  } else if (meridian === "AM" && hours === 12) {
    hours = 0;
  }

  // Return the time in "HH:MM:SS" format
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

let isSecondEarlier = (time1, time2) => {
  // Convert both times to 24-hour format
  const time1In24Hour = convertTo24Hour(time1);
  const time2In24Hour = convertTo24Hour(time2);

  // Compare the two times (lexicographical string comparison works here)
  return time2In24Hour < time1In24Hour;
};
