
// Load saved tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  document.getElementById('do-list').innerHTML = '';
  document.getElementById('plan-list').innerHTML = '';
  document.getElementById('delegate-list').innerHTML = '';
  document.getElementById('eliminate-list').innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleDone(${index})">
      <span class="${task.done ? 'done' : ''}">${task.name}</span>
    `;

    if (task.category === 'do') document.getElementById('do-list').appendChild(li);
    if (task.category === 'plan') document.getElementById('plan-list').appendChild(li);
    if (task.category === 'delegate') document.getElementById('delegate-list').appendChild(li);
    if (task.category === 'eliminate') document.getElementById('eliminate-list').appendChild(li);
  });
}

function addTask() {
  const name = document.getElementById('task-name').value;
  const category = document.getElementById('task-category').value;
  if (name.trim() === '') return;
  tasks.push({ name, category, done: false });
  saveTasks();
  renderTasks();
  document.getElementById('task-name').value = '';
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

// Initial render
renderTasks();
