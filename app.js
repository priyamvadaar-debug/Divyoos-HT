// Load habits from localStorage or start empty
let habitsData = JSON.parse(localStorage.getItem("habitsData")) || { habits: [], lastDate: null };

// Check if date changed to reset daily
function checkDailyReset() {
  const today = new Date().toDateString();
  if (habitsData.lastDate !== today) {
    habitsData.habits.forEach(habit => {
      if (habit.done) {
        habit.streak = (habit.streak || 0) + 1; // increment streak if done yesterday
      } else {
        habit.streak = 0; // reset streak if not done
      }
      habit.done = false; // reset done for new day
    });
    habitsData.lastDate = today;
    save();
  }
}

// Save to localStorage and render
function save() {
  localStorage.setItem("habitsData", JSON.stringify(habitsData));
  render();
}

// Add new habit
function addHabit() {
  const name = prompt("Enter habit name:");
  if (!name) return;

  habitsData.habits.push({ name, done: false, streak: 0 });
  save();
}

// Toggle checkbox
function toggleHabit(index) {
  habitsData.habits[index].done = !habitsData.habits[index].done;
  save();
}

// Render habits
function render() {
  const container = document.getElementById("habits");
  container.innerHTML = "";

  habitsData.habits.forEach((habit, index) => {
    const div = document.createElement("div");
    div.className = "habit";
    div.innerHTML = `
      <div>
        ${habit.name} 
        <span class="streak">🔥 ${habit.streak || 0}</span>
      </div>
      <input type="checkbox" ${habit.done ? "checked" : ""} onclick="toggleHabit(${index})">
    `;
    container.appendChild(div);
  });
}

// Initial check and render
checkDailyReset();
render();