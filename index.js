var index = 0; //asigns index to list items
const fullListID = "taskList";
const entry = document.getElementById(fullListID);
const deleteBtn = document.getElementById("deleteBtn");
var previousEditIndex = ""; //the index for the previous list item that was put in edit mode
var submittedEditIndex = null; //this will help prevent double submit overides to textareaPrevious
var textareaPrevious = "";
function crossedItems() {
  return entry.querySelectorAll(".crossed-out");
}

function sideIcons(index) {
  return `<span><i class="fas fa-edit icon" onclick="editMode(${index})"></i><i class="fas fa-trash icon" onclick="deleteItems(${index})"></i></span>`;
}

document
  .getElementById("inputSection")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission

    task = document.getElementById("task");

    // THIS IS THE CODE TO PERSIST THE EDIT MODE BUTTON FUNCTIONALITY
    try {
      var textareaCurrent = document.querySelector("textarea").value;
      if (submittedEditIndex != previousEditIndex) {
        textareaPrevious = document.querySelector("textarea").innerHTML;
      }

      submittedEditIndex = previousEditIndex;
      // prevents double submit overiding textareaPrevious
      // if (textareaCurrent != textareaCurrent){
      // }
    } catch (error) {}

    // if (task.value != "") {
    entry.innerHTML += `<li id="${index}"><input 
      onclick="toggleCrossOut(${index})" type="checkbox"><span class="content">${
      task.value
    }${sideIcons(index)}</span></li>`;
    // }

    task.value = "";
    index++;

    entryItems = document.querySelectorAll("li");

    // entryItems.forEach((entryItem) => {
    //   // Add event listener for mouseover (hover)
    //   entryItem.addEventListener("mouseover", () => {
    //     try {
    //       icon = entryItem.querySelector(".icon");
    //       icon.classList.remove("hide");
    //     } catch (error) {}
    //   });

    //   // Add event listener for mouseout (when mouse leaves)
    //   entryItem.addEventListener("mouseout", () => {
    //     try {
    //       icon = entryItem.querySelector(".icon");
    //       icon.classList.add("hide");
    //     } catch (error) {}
    //   });
    // });

    // persist the checkboxes after submit button is pressed
    crossedItems().forEach(function (item) {
      item.querySelector("input").checked = true;
    });

    // THIS IS THE CODE TO PERSIST THE EDIT MODE BUTTON FUNCTIONALITY
    try {
      textArea = document.querySelector("textarea").innerHTML = textareaCurrent;
      buttons = getContent(previousEditIndex).querySelectorAll("button");
      let cancelBtn = getContent(previousEditIndex).querySelector(".cancelBtn")
      let okBtn = getContent(previousEditIndex).querySelector(".okBtn")

      //cancel button
      cancelBtn.onclick = function () {
        edit(previousEditIndex, textareaPrevious);
      };

      //ok button
      okBtn.onclick = function () {
        edit(previousEditIndex, textareaCurrent);
      };

      // editMode(currentEditIndex)
    } catch (error) {}
  });
function edit(index, stuff) {
  getContent(index).innerHTML = `${stuff}${sideIcons(index)}`;
}

function getContent(index) {
  return document.getElementById(index).querySelector(".content");
}

function editMode(index) {
  // Gets rid of other list item in 'edit mode'
  try {
    const textArea = document.querySelector("textarea");
    const previousInnerText = textArea.innerHTML;

    //prevents submit action while in edit mode, from changing the original value
    if (submittedEditIndex == previousEditIndex) {
      edit(previousEditIndex, textareaPrevious);
    } else {
      edit(previousEditIndex, previousInnerText);
    }
  } catch (error) {}
  previousEditIndex = index;

  const content = getContent(index);
  uneditedText = content.innerText;

  content.innerHTML = `<br><textarea>${content.innerText}</textarea>`;

    //Cancel button
    const cancelBtn = document.createElement("button");
    cancelBtn.className = "cancelBtn"
    cancelBtn.innerText = "Cancel";
    cancelBtn.onclick = function () {
      edit(index, uneditedText);
    };
    content.appendChild(cancelBtn);

  //Ok button
  const okBtn = document.createElement("button");
  okBtn.className = "okBtn"
  okBtn.innerText = "Ok";
  okBtn.onclick = function () {
    edit(index, document.querySelector("textarea").value);
  };
  content.appendChild(okBtn);

}

// assigns crossed-out text-decoration to list if input box is pressed
function toggleCrossOut(n) {
  if (n != null) {
    var select_task = document.getElementById(n);
    select_task.classList.toggle("crossed-out"); // Toggles the 'crossed-out' class
  }

  // this toggles the hide class, only if you go from 0 to 1 or 1 to 0
  if (crossedItems().length > 0) {
    deleteBtn.classList.remove("hide");
    deleteBtn.innerHTML = `Delete (${
      crossedItems().length
    }) <i class="fas fa-trash"></i>`;
  } else {
    deleteBtn.classList.add("hide");
  }
}

function popUpWindow(index) {
  const body = document.querySelector("body");

  var popupHTML = `
  <div id="popup" class="popup">
        <div class="popup-content">
          <span id="closePopup" class="close">&times;</span>
          <h2>Delete Item?</h2>
          <p>Delete '${getContent(index).innerText}'?</p>
          <button id="cancelPopup">Cancel</button>
          <button id="deletePopup">Delete</button>
        </div>


    </div>`;

  const popupContainer = document.createElement("div")
  popupContainer.innerHTML = popupHTML
  body.appendChild(popupContainer)
  const popup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("closePopup");
  const cancelPopupBtn = document.getElementById("cancelPopup");
  const deletePopupBtn = document.getElementById("deletePopup");
  


  // open the popup
  popup.style.display = "flex";

  // Function to close the popup
  cancelPopupBtn.onclick = function(){closePopup()}
  closePopupBtn.onclick = function(){closePopup()}
  
  function closePopup() {
    popup.style.display = "none";
    body.removeChild(popupContainer)
  };

  // Close popup if user clicks outside of it
  window.onclick = function (event) {
    if (event.target === popup) {
      closePopup()
      
    }
  };

  // Delete item
  deletePopupBtn.onclick = function(){
    closePopup()
    document.getElementById(index).remove();
    toggleCrossOut();
  }
}

function deleteItems(index) {
  if (index == null) {
    crossedItems().forEach(function (item) {
      item.remove();
      deleteBtn.classList.add("hide");
    });
  } else {
    popUpWindow(index);

  }
}
