document
  .getElementById("inputSection")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission
    task = document.getElementById("task").value;

    const entry = document.getElementById("taskList");
    entry.innerHTML += `<ul><li>${task}</li></ul>`;


  
  });
