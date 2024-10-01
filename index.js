var index = 0 //asigns index to list items
document
  .getElementById("inputSection")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission
    task = document.getElementById("task");

    const entry = document.getElementById("taskList");
    if (task.value != ''){
      entry.innerHTML += `<div><ul><li id="${index}"><input onclick="toggleCrossOut(${index})" type="checkbox">${task.value}</input></li></ul></div>`;
    }

    task.value = ''
    index++

    crossedItems = entry.querySelectorAll('.crossed-out');
    // persist the checkboxes after submit button is pressed
    crossedItems.forEach(function(item){
      item.querySelector('input').checked = true
    })

  });

  // assigns crossed-out text-decoration to list if input box is pressed
  function toggleCrossOut(n) {
    select_task = document.getElementById(n)
    select_task.classList.toggle('crossed-out'); // Toggles the 'crossed-out' class
}


