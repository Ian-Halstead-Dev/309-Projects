let select = document.getElementById("endTime-input");

for (let i = 1; i < 13; i++) {
  let option = document.createElement("option");
  option.value = i;

  let newTime = new Date();
  newTime.setHours(newTime.getHours() + i);
  option.innerText =
    newTime.toLocaleTimeString() + ` (${i} hour${i == 1 ? "" : "s"} from now)`;
  select.appendChild(option);
}
