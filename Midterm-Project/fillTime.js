let select = document.getElementById("endTime-input");

for (let i = 1; i < 25; i++) {
  let option = document.createElement("option");
  option.value = i;

  let currTime = new Date();
  let newTime = new Date();

  newTime.setHours(newTime.getHours() + i);
  option.innerText =
    newTime.toLocaleTimeString() + ` (${i} hour${i == 1 ? "" : "s"} from now)`;

  if (
    isSecondEarlier(newTime.toLocaleTimeString(), currTime.toLocaleTimeString())
  ) {
    select.appendChild(option);
  }
}
