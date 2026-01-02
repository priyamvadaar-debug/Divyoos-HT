let habitsData = JSON.parse(localStorage.getItem("habitsData")) || { habits: [], lastDate: null };

function getWeekday(date) {
  return new Date(date).getDay();
}

function checkDailyReset() {
  const today = new Date().toDateString();
  if (habitsData.lastDate !== today) {
    habitsData.habits.forEach(habit => {
      if (!habit.week) habit.week = Array(7).fill(false);

      const yesterday = new Date(habitsData.lastDate || today);
      const dayDiff = (new Date(today) - yesterday)/(1000*60*60*24);

      if(dayDiff >= 1){
        for(let i=0;i<Math.min(dayDiff,7);i++){
          habit.week.shift();
          habit.week.push(false);
        }
      }

      if(habit.done){
        const yesterdayIndex = (getWeekday(new Date(today)) + 6) % 7;
        habit.week[yesterdayIndex] = true;
        habit.streak = (habit.streak || 0) +1;
      } else {
        habit.streak = 0;
      }

      habit.done = false;
    });
    habitsData.lastDate = today;
    save();
  }
}

function save() {
  localStorage.setItem("habitsData", JSON.stringify(habitsData));
  render();
}

function addHabit() {
  const name = prompt("Enter habit name:");
  if (!name) return;
  habitsData.habits.push({ name, done: false, streak: 0, week: Array(7).fill(false) });
  save();
}

function toggleHabit(index) {
  habitsData.habits[index].done = !habitsData.habits[index].done;
  save();
}

function render() {
  const container = document.getElementById("habits");
  container.innerHTML = "";

  const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const todayIndex = getWeekday(new Date());

  habitsData.habits.forEach((habit, index) => {
    const div = document.createElement("div");
    div.className = "habit";

    let weekHtml = habit.week.map((done, i) => {
      const dayClass = i === todayIndex ? "today" : "";
      return `<span class="day ${dayClass}">${done ? "✅" : "⬜"}</span>`;
    }).join("");

    div.innerHTML = `
      <div>
        <strong>${habit.name}</strong> 🔥 ${habit.streak}<br>
        ${weekHtml}
      </div>
      <input type="checkbox" ${habit.done ? "checked" : ""} onclick="toggleHabit(${index})">
    `;
    container.appendChild(div);
  });
}

checkDailyReset();
render();