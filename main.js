var navListener = document.querySelector('#nav-listener');
var mainHeader = document.querySelector('#js-main-header');
var rightSection = document.querySelector('#right-section');
var toDoListInput = document.querySelector('#new-todo-input');
var taskItemInput = document.querySelector('#task-item-input')
var newTaskSpace = document.querySelector('#new-task-space');
var makeTaskListBtn = document.querySelector('#make-list-btn')
var allTasksList = [];
var allToDos = [];


navListener.addEventListener('click', navBtnClicked);
rightSection.addEventListener('click', determineCardBtnClicked);


window.onload = function() {
  retrieveSavedCards();
  checkIfComplete();
};


function navBtnClicked() {
  var target = event.target;
 if (target.id === 'make-list-btn') {
   disableMakeListBtn(target)
   // createNewToDoList(target);
 } else if (target.id === 'clear-all-btn') {
   disableClearAllBtn(target);
 } else {
   addRemoveBtn(target);
 }
}

function addRemoveBtn(target) {
  if (target.id === 'add-btn') {
    addTaskToDom();
  } else if (target.id === 'small-image') {
    deleteTaskNav(target);
  }
}

function clearInputs() {
  toDoListInput.value = '';
  taskItemInput.value = '';
}

function addTaskToDom() {
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
  var task = new Task(Date.now(), newTaskTitle);
    allTasksList.push(task);
}

function createNewToDoList() {
  var newToDo = new ToDo(Date.now(), toDoListInput.value, allTasksList);
    clearInputs();
    allToDos.push(newToDo);
    newToDo.saveToStorage(allToDos);
    displayToDo(newToDo);

}

function clearTaskDOM() {
  newTaskSpace.querySelectorAll('.new-task').forEach(task => task.remove());
}

function displayToDo(newToDo) {
   rightSection.insertAdjacentHTML('beforeend',
   `<div id=js${newToDo.uniqueID} class="new-card">
     <h2>${newToDo.title}</h2>
     <div id="js-${newToDo.uniqueID}" class="card-tasks"></div>
     <div id="footer">
     <div class="card-btn-container" id="js-${newToDo.uniqueID}">
       <image type="button" name="button" class="urgent-btn card-btn" id="js-${newToDo.uniqueID}" src="assets/urgent.svg">
       <span class="card-btn-label">urgent</span>
     </div>
     <div class="card-btn-container" id="js-${newToDo.uniqueID}">
       <image type="button" name="button" class="delete-btn card-btn" id="js-${newToDo.uniqueID}" src="assets/delete.svg">
       <span class="card-btn-label">delete</span>
     </div>
   </div>`);
  addTasksToCard(newToDo);
}

function addTasksToCard(newToDo) {
  var taskList = document.querySelector(`#js-${newToDo.uniqueID}`);
  for (var i = 0; i < newToDo.tasks.length; i++) {
    taskList.insertAdjacentHTML('beforeend',
   `<image id="js-${newToDo.tasks[i].uniqueID}" class="toDo-check-box small-image" src="assets/checkbox.svg">
    <span id="js-${newToDo.tasks[i].uniqueID}" class="change-text">${newToDo.tasks[i].taskName}</span>`);
    allTasksList = [];
    clearTaskDOM();
  }
}

function disableMakeListBtn(target) {
  if (toDoListInput.value && newTaskSpace.childNodes.length > 0) {
    createNewToDoList();
  }
}

function disableClearAllBtn(target) {
  if (toDoListInput.value && newTaskSpace.childNodes.length > 0) {
    clearInputs();
    clearTaskDOM();
    allTasksList = [];
  }
}

function retrieveSavedCards () {
  var unstringTasks = localStorage.getItem('tasks');
  var unstringToDo = JSON.parse(unstringTasks);
  if (unstringToDo){
    for (var i = 0; i < unstringToDo.length; i++) {
      var newList = new ToDo(unstringToDo[i].uniqueID, unstringToDo[i].title, unstringToDo[i].tasks);
      allToDos.push(newList);
      displayToDo(unstringToDo[i]);
    }
  } else {
    return;
  }
}

function determineCardBtnClicked() {
  target = event.target;
  if (target.classList[0] === 'delete-btn') {
    locateToDoDelete(target);
  } else if (target.classList[0] === 'urgent-btn') {
    makeUrgent()
  } else if (target.classList[0] === 'toDo-check-box') {
    taskCompleted(target)  }
}

function taskCompleted(target) {
  locateToDoList(target);
  if (target.getAttribute('src') === 'assets/checkbox.svg') {
    target.src = 'assets/checkbox-active.svg';
    target.nextSibling.nextSibling.style.color = 'grey';
  } else if (target.getAttribute('src') === 'assets/checkbox-active.svg') {
    target.src = 'assets/checkbox.svg';
    target.nextSibling.nextSibling.style.color = 'black';
  }
}

function locateToDoDelete(target) {
    for (var i = 0; i < allToDos.length; i++) {
      if(`js-${allToDos[i].uniqueID}` === target.id) {
        deleteToDoList(allToDos[i].tasks, allToDos[i]);
    }
  }
}

function deleteToDoList(taskList, toDoList) {
  var completedTasks = []
  for (i = 0; i < taskList.length; i++) {
    if(taskList[i].complete)
      completedTasks.push(taskList[i]);
  }
  updateDom(taskList, toDoList, completedTasks);
}

function updateDom(taskList, toDoList, completedTasks) {
  if(completedTasks.length === taskList.length) {
    var removeMe = allToDos.indexOf(toDoList);
      allToDos.splice(removeMe, 1);
      toDoList.deleteFromStorage(allToDos);
      window.location.reload();
  }
}

function locateToDoList(target) {
  for (var i = 0; i < allToDos.length; i++) {
    if (target.parentNode.id === `js-${allToDos[i].uniqueID}`) {
      allToDos[i].updateTask(allToDos[i], target);
    }
  }
}

function checkIfComplete() {
  for (var i = 0; i < allToDos.length; i++) {
  allToDos[i].tasks.forEach(element => persistCheckOff(element));
  }
}

function persistCheckOff(element) {
  var checkedOff = document.querySelector(`#js-${element.uniqueID}`);
  if (element.complete === true) {
    checkedOff.src = 'assets/checkbox-active.svg';
    checkedOff.nextSibling.nextSibling.style.color = 'grey';
  } else {
    checkedOff.src = 'assets/checkbox.svg';
    checkedOff.nextSibling.nextSibling.style.color = 'black';
  }
}

function makeUrgent() {
  if (target.getAttribute('src') === 'assets/urgent.svg') {
    target.src = 'assets/urgent-active.svg';
    persistUrgent(target);
  } else if (target.getAttribute('src') === 'assets/urgent-active.svg') {
    target.src = 'assets/urgent.svg';
  }
}
