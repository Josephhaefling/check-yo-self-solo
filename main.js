var navListener = document.querySelector('#nav-listener');
var mainHeader = document.querySelector('#js-main-header');
var taskList = [];


navListener.addEventListener('click', btnClicked);
mainHeader.addEventListener('click', btnClicked);

function btnClicked () {
  var target = event.target;
  if (target.classList[0] ==='js-nav-btn') {
    determineBtn(target);
  } else if (target.id ==='search-button'){
    console.log('search');
  }
}

function determineBtn(target) {
  if (target.id === 'add-btn') {
    createTaskObj();
  } else if (target.id === 'make-list') {
    createNewToDoList();
  } else if (target.id === 'clear-all') {
    console.log('clear');
  } else if (target.classList[1] === 'small-image') {
    deleteTask(target);
  }
}

function createTaskObj() {
  var newTask = document.querySelector('#task-item-input');
  var task = new Task(newTask.value);
  task.createTaskId();
  addTask(task, newTask);
  taskList.push(task);
}

function addTask(taskObj, newTask) {
  var newTaskSpace = document.querySelector('#new-task-space');
  if (taskObj.taskName) {
    newTaskSpace.insertAdjacentHTML('afterbegin', `<div class="new-task" id="js-${taskObj.uniqueID}"> <img class="js-nav-btn small-image" id="js-${taskObj.uniqueID}" src="assets/delete.svg">${taskObj.taskName}</div>`);
    newTask.value = '';
  }
}

function deleteTask(target) {
  var parent = document.querySelector(`#${target.id}`);
  target.remove();
  parent.remove();
}

function createNewToDoList() {
  var toDoTitle = document.querySelector('#new-task-input');
  var todo = new ToDo(toDoTitle.value, taskList);
  todo.createToDoId();
  clearTasks();
  displayToDo(todo);
}

function clearTasks() {
  var newTaskSpace = document.querySelector('#new-task-space');
  newTaskSpace.querySelectorAll('.new-task').forEach(task => task.remove());
  taskList = [];
}

function clearToDoInput() {
  var toDoInput = document.querySelector('#new-task-input');
  console.log(toDoInput.value);
  toDoInput.value = '';
}

function displayToDo(newList) {
  var rightSection = document.querySelector('#right-section');
  rightSection.insertAdjacentHTML('beforeend',
  `<div id="new-card">
  <h2>${newList.title}</h2>
  <div id="js-${newList.id}" class="card-tasks"></div>
  <div id="footer">
    <div class="card-btn-container">
      <image type="button" name="button" class="card-btn" id="urgent-btn" src="assets/urgent.svg">
      <span class="card-btn-label">urgent</span>
    </div>
    <div class="card-btn-container">
      <image type="button" name="button" class="card-btn" id="delete-btn" src="assets/delete.svg">
      <span class="card-btn-label">delete</span>
    </div>
  </div>`);
  addTasksToCard(newList);
  clearToDoInput();
}

function addTasksToCard (newList) {
  var listOfTasks = document.querySelector(`#js-${newList.id}`);
  console.log(newList.id);
  for (var i = 0; i < newList.tasks.length; i++) {
    listOfTasks.insertAdjacentHTML('beforeend',
  `<image class="toDo-check-box" src="assets/checkbox.svg">
    <span>${newList.tasks[i].taskName}</span>`);
  }
}
