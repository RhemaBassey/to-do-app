var index = 0; //asigns index to list items
const fullListID = "taskList";
const entry = document.getElementById(fullListID);
const deleteBtn = document.getElementById("deleteBtn");
var previousEditIndex = '' //the index for the previous list item that was put in edit mode
var submittedEditIndex = null//this will help prevent double submit overides to textareaPrevious
var textareaPrevious = ''
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

    // THIS IS THE CODE TO PERSIST THE EDIT MODE BUTTON FUNCTIONALITY
    try{   

      var textareaCurrent = document.querySelector("textarea").value
      if(submittedEditIndex != previousEditIndex){
        textareaPrevious = document.querySelector('textarea').innerHTML
      }

      submittedEditIndex = previousEditIndex
      // prevents double submit overiding textareaPrevious
      // if (textareaCurrent != textareaCurrent){
      // }

    }catch(error){
    }

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

// THIS IS THE CODE TO PERSIST THE EDIT MODE BUTTON FUNCTIONALITY
try{

  textArea = document.querySelector('textarea').innerHTML = textareaCurrent
  buttons =  getContent(previousEditIndex).querySelectorAll('button')

  buttons[0].onclick = function(){
    edit(previousEditIndex, textareaCurrent)
  }
  buttons[1].onclick = function(){
    edit(previousEditIndex, textareaPrevious)
  }

  // editMode(currentEditIndex)
}catch(error){

}
 

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
    const textArea = document.querySelector('textarea')
    const previousInnerText = textArea.innerHTML

    //prevents submit action while in edit mode, from changing the original value
    if(submittedEditIndex == previousEditIndex){
      edit(previousEditIndex, textareaPrevious)
    }
    else{
          edit(previousEditIndex, previousInnerText)

    }
  } catch (error) {}
  previousEditIndex = index


  const content = getContent(index);
  uneditedText = content.innerText

  content.innerHTML = `<br><textarea>${content.innerText}</textarea>`;

  //Ok button
  const okBtn = document.createElement("button");
  okBtn.innerText = "Ok";
  okBtn.onclick = function () {
    edit(index, document.querySelector("textarea").value);
  };
  content.appendChild(okBtn);
  //Cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.onclick = function () {
    edit(index, uneditedText);
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
