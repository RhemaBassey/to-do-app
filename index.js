var index = 0; //asigns index to list items
const fullListID = "taskList";
const entry = document.getElementById(fullListID);
const deleteBtn = document.getElementById("deleteBtn");
let prevEditIndex = null; // this is to track the index of the last list item in 'Edit Mode' so it can be closed
//takes note of crossed out items
function crossedItems() {
  return entry.querySelectorAll(".crossed-out");
}

function editIcon(index) {
  return `<span class="icon hide"><i class="fas fa-edit" onclick="editMode(${index})"></i></span>`;
}

document
  .getElementById("inputSection")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission
    task = document.getElementById("task");

    // if (task.value != "") {
      entry.innerHTML += `<li id="${index}"><input 
      onclick="toggleCrossOut(${index})" type="checkbox"><span class="content">${
        task.value
      }${editIcon(index)}</span></li>`;
    // }
    task.value = "";
    index++;

    entryItems = document.querySelectorAll("li");

    entryItems.forEach((entryItem) => {
      // Add event listener for mouseover (hover)
      entryItem.addEventListener("mouseover", () => {
        try {
          icon = entryItem.querySelector(".icon");
          icon.classList.remove("hide");
        } catch (error) {}
      });

      // Add event listener for mouseout (when mouse leaves)
      entryItem.addEventListener("mouseout", () => {
        try {
          icon = entryItem.querySelector(".icon");
          icon.classList.add("hide");
        } catch (error) {}
      });
    });

    // persist the checkboxes after submit button is pressed
    crossedItems().forEach(function (item) {
      item.querySelector("input").checked = true;
    });

    // THIS IS THE CODE TEMPLATE TO PERSIST THE EDIT MODE BUTTON FUNCTIONALITY
    // try {
    //   prevInnerButtons = getContent(prevEditIndex).querySelectorAll("button")
    //   prevInnerButtons[0].onclick = console.log('OK button')
    //   prevInnerButtons[1].onclick = console.log('CANCEL button')
    // } catch (error) {console.log(error)}

  });
function edit(index, stuff) {
  getContent(index).innerHTML = `${stuff}${editIcon(index)}`;
}

function getContent(index) {
  return document.getElementById(index).querySelector(".content");
}

function editMode(index) {
  // Gets rid of other list item in 'edit mode'
  try {
    prevInnerText = getContent(prevEditIndex).querySelector('textarea').innerHTML
    edit(prevEditIndex, prevInnerText)
  } catch (error) {}
  prevEditIndex = index;

  const content = getContent(index);
  uneditedText = content.innerText
  const indexA = index + 100;

  content.innerHTML = `<br><textarea id="${indexA}">${content.innerText}</textarea>`;

  //Ok button
  const okBtn = document.createElement("button");
  okBtn.innerText = "Ok";
  okBtn.onclick = function () {
    console.log("clicked OK")
    // edit(index, document.getElementById(indexA).value);
  };
  content.appendChild(okBtn);
  //Cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.onclick = function () {
    console.log("clicked CANCEL")
    // edit(index, uneditedText);
  };
  content.appendChild(cancelBtn);

}

// assigns crossed-out text-decoration to list if input box is pressed
function toggleCrossOut(n) {
  var select_task = document.getElementById(n);
  select_task.classList.toggle("crossed-out"); // Toggles the 'crossed-out' class

  // this toggles the hide class, only if you go from 0 to 1 or 1 to 0
  if (crossedItems().length > 0) {
    deleteBtn.classList.remove("hide");
    deleteBtn.innerHTML = `Delete (${crossedItems().length}) <i class="fas fa-trash"></i>`
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
