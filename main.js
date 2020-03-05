var navListener = document.querySelector('#nav-listener');
var mainHeader = document.querySelector('#js-main-header');
var rightSection = document.querySelector('#right-section');
var toDoListInput = document.querySelector('#new-todo-input');
var taskItemInput = document.querySelector('#task-item-input')
var taskSpace = document.querySelector('#new-task-space');
var allTasksList = [];
var allToDos = [];


navListener.addEventListener('click', navBtnClicked);
// mainHeader.addEventListener('click', btnClicked);
// rightSection.addEventListener('click', btnClicked);

// window.onload = function() {
//   retrieveSavedCards();
// };


function navBtnClicked() {
  var target = event.target;
 if (target.id === 'make-list-btn') {
   createNewToDoList(target);
 } else if (target.id === 'clear-all-btn') {
   clearInputs();
 } else {
   addRemoveBtn(target);
 }
}

function addRemoveBtn(target) {
  if (target.id === 'add-btn') {
    addTaskToDom();
  } else if (target.id === 'small-image') {
    console.log('');
    deleteTaskNav(target);
  }
}

function clearInputs() {
  toDoListInput.value = '';
  taskItemInput.value = '';
}

function addTaskToDom() {
  var newTaskSpace = document.querySelector('#new-task-space');
  if (taskItemInput.value) {
    newTaskSpace.insertAdjacentHTML('beforeend', `<div class="new-task"> <img class="js-nav-btn" id="small-image" src="assets/delete.svg">${taskItemInput.value}</div>`);
    createTaskObj(taskItemInput.value);
    taskItemInput.value = '';
  }
}

function deleteTaskNav(target) {
  var parent = target.closest('.new-task');
  console.log(parent);
  target.remove();
  parent.remove();
}

function createTaskObj(newTaskTitle) {
  var task = new Task(newTaskTitle);
    task.createTaskId();
    allTasksList.push(task);
}

function createNewToDoList() {
  var newToDo = new ToDo(Date.now(), toDoListInput.value, allTasksList);
    newToDo.createToDoId();
    clearInputs();
    allToDos.push(newToDo);
    newToDo.saveToStorage(allToDos);
    displayToDo(newToDo);

}

function clearTaskDOM() {
  taskSpace.querySelectorAll('.new-task').forEach(task => task.remove());
}

function displayToDo(newToDo) {
   rightSection.insertAdjacentHTML('beforeend',
   `<div id=js-${newToDo.uniqueId}>
     <h2>${newToDo.title}</h2>
     <div id="${newToDo.title}" class="card-tasks"></div>
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
  addTasksToCard(newToDo);
}

function addTasksToCard(newToDo) {
  var taskList = document.querySelector(`#${newToDo.title}`);
  for (var i = 0; i < newToDo.tasks.length; i++) {
    taskList.insertAdjacentHTML('beforeend',
   `<image id="js-${newToDo.tasks[i].uniqueID}" class="toDo-check-box small-image" src="assets/checkbox.svg">
    <span id="js-${newToDo.tasks[i].uniqueID}" class="change-text">${newToDo.tasks[i].taskName}</span>`);
    allTasksList = [];
    clearTaskDOM();
  }
}


// keep us


//
//

// Not Sure


// function deleteTaskDOM() {
//   if (event.target.id === 'clear-all') {
//     console.log(event.target.id);
//   } else if (event.target.classList[1] === 'small-image') {
//     return;
//   }
// }

// function btnClicked () {
//   var target = event.target;
//   if (target.classList[0] === 'js-nav-btn') {
//     addBtn(target);
//   } else if (target.id === 'search-button'){
//     console.log('search');
//   } else if (target.classList[0] === 'toDo-check-box') {
//     createNewToDoList(target);
//   }
// }
//
// function addBtn(target) {
//   if (target.id === 'add-btn') {
//     createTaskObj();
//     disableBtn();
//   } else {
//     makeListBtn(target);
//   }
// }
//
// function makeListBtn(target) {
//   if (target.id === 'make-list') {
//     createNewToDoList(target);
//   } else {
//     deleteBtns(target);
//   }
// }
//
// function toggleCompleted(target, taskList) {
//   var targetClass = document.querySelector('.toDo-check-box');
//   var text = target.nextSibling;
//   var textNextSibling = text.nextSibling;
//   if (target.complete === true && target.getAttribute('src') === 'assets/checkbox.svg') {
//     target.src = 'assets/checkbox-active.svg';
//     textNextSibling.classList.toggle('change-text');
//   } else {
//     textNextSibling.classList.toggle('change-text');
//     target.src = 'assets/checkbox.svg';
//     taskList.complete = false;
//   }
//     var updatedToDo = new ToDo(taskList.title, taskList.taskList, taskList.uniqueID);
//     updatedToDo.updateStorage(allToDos);
// }
//

//
// function disableBtn() {
//   var makeListBtn = document.querySelector('#make-list');
//   var newTaskSpace  = document.querySelector('#new-task-space');
//   var newTask = document.querySelector('.new-task');
//   var clearAllBtn = document.querySelector('#clear-all');
//   if (toDoListInput.value && newTaskSpace.childNodes[0].classList.value === 'new-task') {
//     makeListBtn.disabled = false;
//     clearAllBtn.disabled = false;
//   }
// }
//
// //
// function addTasksToCard(newList, specifiedID) {
//   var listOfTasks = document.querySelector(`#js-${specifiedID}`);
//   for (var i = 0; i < newList.tasks.length; i++) {
//     listOfTasks.insertAdjacentHTML('beforeend',
//    `<image id="js-${newList.tasks[i].uniqueID}" class="toDo-check-box small-image" src="assets/checkbox.svg">
//     <span id="js-${newList.tasks[i].uniqueID}" class="change-text">${newList.tasks[i].taskName}</span>`);
//   }
// }
//
// function retrieveSavedCards () {
//   var unstringTasks = localStorage.getItem('tasks');
//   var unstringToDo = JSON.parse(unstringTasks);
//   if (unstringToDo === null) {
//     return;
//   }
//   for (var i = 0; i < unstringToDo.length; i++) {
//     var newList = new ToDo(unstringToDo[i].title, unstringToDo[i].tasks, unstringToDo[i].uniqueId, unstringToDo[i].tasks.complete);
//     allToDos.push(newList);
//     displayToDo(newList);
//   }
// }
