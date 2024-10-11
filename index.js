var index = 0; //asigns index to list items
const fullListID = "taskList";
const entry = document.getElementById(fullListID);
const deleteBtn = document.getElementById("deleteBtn");

//takes note of crossed out items
function crossedItems() {
  return entry.querySelectorAll(".crossed-out");
}

function editIcon(index) {
  return `<span class="hide"><i class="fas fa-edit" onclick="editMode(${index})"></i></span>`;
}

document
  .getElementById("inputSection")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission
    task = document.getElementById("task");

    if (task.value != "") {
      entry.innerHTML += `<li id="${index}"><input 
      onclick="toggleCrossOut(${index})" type="checkbox">${
        task.value
      }${editIcon(index)}</li>`;
    }
    task.value = "";
    index++;

    entryItems = document.querySelectorAll("li");

    entryItems.forEach((entryItem) => {
      // Add event listener for mouseover (hover)
      entryItem.addEventListener("mouseover", () => {
        try {
          icon = entryItem.querySelector("span");
          icon.classList.remove("hide");
        } catch (error) {}
      });

      // Add event listener for mouseout (when mouse leaves)
      entryItem.addEventListener("mouseout", () => {
        try {
          icon = entryItem.querySelector("span");
          icon.classList.add("hide");
        } catch (error) {}
      });
    });

    // persist the checkboxes after submit button is pressed
    crossedItems().forEach(function (item) {
      item.querySelector("input").checked = true;
    });
  });

function edit(index, listItemText) {
  const listItem = document.getElementById(index);
  checkBoxState = listItem.querySelector("input").checked

  listItem.innerHTML = `<input 
      onclick="toggleCrossOut(${index})" type="checkbox">${listItemText}${editIcon(
    index
  )}`;

    // persist the checkboxes after submit button is pressed
    listItem.querySelector("input").checked = checkBoxState
}


function editMode(index) {
  const listItem = document.getElementById(index);
  checkBoxState = listItem.querySelector("input").checked


  var editLayout = `<br><textarea>${listItem.innerText}
      </textarea><button>Ok</button><button onclick="edit(${index},'${listItem.innerText}')">Cancel</button>`;
  listItem.innerHTML = `<input 
      onclick="toggleCrossOut(${index})" type="checkbox">${editLayout}</li>`;

  // persist the checkboxes after submit button is pressed
  listItem.querySelector("input").checked = checkBoxState
}

// assigns crossed-out text-decoration to list if input box is pressed
function toggleCrossOut(n) {
  var select_task = document.getElementById(n);
  select_task.classList.toggle("crossed-out"); // Toggles the 'crossed-out' class

  // this toggles the hide class, only if you go from 0 to 1 or 1 to 0
  if (crossedItems().length > 0) {
    deleteBtn.classList.remove("hide");
  } else {
    deleteBtn.classList.add("hide");
  }
}

function deleteItems() {
  crossedItems().forEach(function (item) {
    item.remove();
    deleteBtn.classList.add("hide");
  });
}
