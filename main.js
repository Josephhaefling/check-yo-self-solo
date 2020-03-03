var navListener = document.querySelector('#nav-listener');
var mainHeader = document.querySelector('#js-main-header');
var rightSection = document.querySelector('#right-section');
var toDoListInput = document.querySelector('#new-todo-input');
var taskSpace = document.querySelector('#new-task-space');
var taskList = [];
var allToDos = [];


navListener.addEventListener('click', btnClicked);
mainHeader.addEventListener('click', btnClicked);
rightSection.addEventListener('click', btnClicked);

window.onload = function() {
  retrieveSavedCards();
};

function btnClicked () {
  var target = event.target;
  if (target.classList[0] === 'js-nav-btn') {
    addBtn(target);
  } else if (target.id === 'search-button'){
    console.log('search');
  } else if (target.classList.value === 'toDo-check-box') {
    getTaskIDs(target);
  }
}

// function determineBtn(target) {
//   if (target.id === 'add-btn') {
//     createTaskObj();
//     disableBtn();
//   } else if (target.id === 'make-list') {
//     createNewToDoList();
//   } else if (target.id === 'clear-all') {
//     console.log('clear');
//   } else if (target.classList[1] === 'small-image') {
//     deleteTask(target);
//   }
// }

function addBtn(target) {
  if (target.id === 'add-btn') {
    createTaskObj();
    disableBtn();
  } else {
    makeListBtn(target);
  }
}

function makeListBtn(target) {
  if (target.id === 'make-list') {
    createNewToDoList();
  } else {
    deleteBtns(target);
  }
}

function deleteBtns(target) {
  if (target.id === 'clear-all') {
    console.log('clear');
  } else if (target.classList[1] === 'small-image') {
    // deleteTask(target);
  }
}

function getTaskIDs(target) {
  var taskList = allToDos.map(x => x.tasks);
  var uniqueIDList = taskList.map(y => y[0].uniqueID);
  for (var i = 0; i < uniqueIDList.length; i++){
    if (target.id === `js-${uniqueIDList[i]}`) {
      var indexOfTask = uniqueIDList.indexOf(uniqueIDList[i]);
      taskList[i][indexOfTask].complete = true;
      toggleCompleted(target, taskList[i][indexOfTask]);
    }
  }
}

function toggleCompleted(target, taskList) {
  var targetClass = document.querySelector('.toDo-check-box');
  var text = target.nextSibling;
  var textNextSibling = text.nextSibling;
  if (target.complete === true && target.getAttribute('src') === 'assets/checkbox.svg') {
    target.src = 'assets/checkbox-active.svg';
    textNextSibling.classList.toggle('change-text');
  } else {
    textNextSibling.classList.toggle('change-text');
    target.src = 'assets/checkbox.svg';
    console.log(taskList.complete);
    taskList.complete = false;
    console.log(taskList.complete);
  }
    var updatedToDo = new ToDo(taskList.title, taskList.taskList, taskList.uniqueID);
    console.log(allToDos);
    updatedToDo.updateStorage(allToDos);
}

function createTaskObj() {
  var newTaskInput = document.querySelector('#task-item-input');
  var task = new Task(newTaskInput.value);
  if (newTaskInput.value){
    task.createTaskId();
    addTask(task, newTaskInput);
    taskList.push(task);
  }
}

function addTask(taskObj, newTaskInput) {
  var newTaskSpace = document.querySelector('#new-task-space');
  if (taskObj.taskName) {
    newTaskSpace.insertAdjacentHTML('beforeend', `<div class="new-task" id="js-${taskObj.uniqueID}"> <img class="js-nav-btn small-image" id="js-${taskObj.uniqueID}" src="assets/delete.svg">${taskObj.taskName}</div>`);
    newTaskInput.value = '';
  }
}

function deleteTask(target) {
  var parent = document.querySelector(`#${target.id}`);
  target.remove();
  parent.remove();
}

function disableBtn() {
  var makeListBtn = document.querySelector('#make-list');
  var newTaskSpace  = document.querySelector('#new-task-space');
  var newTask = document.querySelector('.new-task');
  var clearAllBtn = document.querySelector('#clear-all');
  if (toDoListInput.value && newTaskSpace.childNodes[0].classList.value === 'new-task') {
    makeListBtn.disabled = false;
    clearAllBtn.disabled = false;
  }
}

function createNewToDoList() {
  var todo = new ToDo(toDoListInput.value, taskList, Date.now());
  todo.createToDoId();
  clearTasks();
  displayToDo(todo);
  allToDos.push(todo);
  todo.saveToStorage(allToDos);
}

function clearTasks() {
  var newTaskSpace = document.querySelector('#new-task-space');
  newTaskSpace.querySelectorAll('.new-task').forEach(task => task.remove());
  taskList = [];
}

function clearToDoInput() {
  var toDoInput = document.querySelector('#new-todo-input');
  toDoInput.value = '';
}

function displayToDo(newList) {
  var rightSection = document.querySelector('#right-section');
  for (var i = 0; i < newList.tasks.length; i++) {
   rightSection.insertAdjacentHTML('beforeend',
  `<div id="new-card">
  <h2>${newList.tasks[i].taskName}</h2>
  <div id="js-${newList.tasks[i].uniqueID}" class="card-tasks"></div>
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
  addTasksToCard(newList.tasks[i]);
  clearToDoInput();
  }
}

function addTasksToCard (newList) {
  var listOfTasks = document.querySelector(`#js-${newList.uniqueID}`);
  // console.log(newList);
  // for (var i = 0; i < newList.tasks.length; i++) {
    listOfTasks.insertAdjacentHTML('beforeend',
  `<image id="js-${newList.uniqueID}" class="toDo-check-box" src="assets/checkbox.svg">
    <span id="js-${newList.uniqueID}" class="change-text">${newList.taskName}</span>`);
  }
// }

function retrieveSavedCards () {
  var unstringTasks = localStorage.getItem('tasks');
  var unstringToDo = JSON.parse(unstringTasks);
  if(unstringToDo === null){
    return;
  }
  for(var i = 0; i < unstringToDo.length; i++) {
    var newList = new ToDo(unstringToDo[i].title, unstringToDo[i].tasks, unstringToDo[i].uniqueId, unstringToDo[i].tasks.complete);
    allToDos.push(newList);
    displayToDo(newList);
  }
}

// function determineBtn(target) {
//   var btnList = ['createNewToDoList', 'createTask', 'clearAll'];
//   for (i = 0; i < btnList.length; i++){
//     if (target.id === btnList[i]) {
//       console.log(`${btnList[i]}`);
//       `${btnList[i]}()`;
//     }
//   }
// }
