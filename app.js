let habits = JSON.parse(localStorage.getItem("habits")) || [];

function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
  render();
}

function addHabit() {
  const name = prompt("Habit name:");
  if (!name) return;

  habits.push({ name, done: false });
  save();
}

function toggleHabit(index) {
  habits[index].done = !habits[index].done;
  save();
}

function render() {
  const container = document.getElementById("habits");
  container.innerHTML = "";

  habits.forEach((habit, index) => {
    const div = document.createElement("div");
    div.className = "habit";
    div.innerHTML = `
      ${habit.name}
      <input type="checkbox" ${habit.done ? "checked" : ""} 
      onclick="toggleHabit(${index})">
    `;
    container.appendChild(div);
  });
}

render();