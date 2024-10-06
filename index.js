var index = 0; //asigns index to list items
const fullListID = "taskList";
const entry = document.getElementById(fullListID);
const deleteBtn = document.getElementById("deleteBtn");

//takes note of crossed out items
function crossedItems() {
  return entry.querySelectorAll(".crossed-out");
}

document
  .getElementById("inputSection")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission
    task = document.getElementById("task");

    if (task.value != "") {
      entry.innerHTML += `<div><ul><li id="${index}"><input onclick="toggleCrossOut(${index})" type="checkbox">${task.value}</input></li></ul></div>`;
    }

    task.value = "";
    index++;

    // persist the checkboxes after submit button is pressed
    crossedItems().forEach(function (item) {
      item.querySelector("input").checked = true;
    });
  });

// assigns crossed-out text-decoration to list if input box is pressed

function toggleCrossOut(n) {
  var select_task = document.getElementById(n);
  select_task.classList.toggle("crossed-out"); // Toggles the 'crossed-out' class



  // this toggles the hide class, only if you go from 0 to 1 or 1 to 0
  if(crossedItems().length > 0){
    deleteBtn.classList.remove("hide");
  } else{
    deleteBtn.classList.add("hide");
  }

}

function deleteItems(){
  console.log("deleted")
  crossedItems().forEach(function (item) {
    item.remove()
    deleteBtn.classList.add("hide");
  });
}
