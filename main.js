var navListener = document.querySelector('#nav-listener');
var mainHeader = document.querySelector('#js-main-header');


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
    addTask()
  } else if (target.id === 'make-list') {
    console.log('make');
  } else if (target.id === 'clear-all') {
    console.log('clear');
  } else if (target.id === 'small-image') {
    deleteElement(target);
  }
}

function addTask() {
  var newTaskSpace = document.querySelector('#new-task-space');
  var newTask = document.querySelector('#task-item-input');
  var task = new Task(newTask.value);
  console.log(task);
  if (newTask.value) {
    newTaskSpace.insertAdjacentHTML('afterbegin', `<div id="newID"> <img class="js-nav-btn" id="small-image" src="assets/delete.svg">${newTask.value}</div>`);
  }
}

function deleteElement(target) {
  var parent = document.querySelector("#newID");
  console.log(parent);
  target.remove();
  parent.remove();
}
//Give tasks a unique ID somehow
//create global variable of task objects
//Onlick of Make Task List create an instance of the TODO list
//Give TODO a unique ID some how
//.push() the global variable into the new instance of ToDO
//Clear the global va
