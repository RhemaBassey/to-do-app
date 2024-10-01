var n = 0
document
  .getElementById("inputSection")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission
    task = document.getElementById("task");

    const entry = document.getElementById("taskList");
    entry.innerHTML += `<div><ul><li id="${n}"><input onclick="toggleCrossOut(${n})" type="checkbox">${task.value}</input></li></ul></div>`;
    task.value = ''

    n++
    console.log(n)

  });
  function toggleCrossOut(n) {
    select_task = document.getElementById(n)
    select_task.classList.toggle('crossed-out'); // Toggles the 'crossed-out' class
}