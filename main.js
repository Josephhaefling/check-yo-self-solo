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
  } else if (target.id === 'make-list'){
  console.log('make');
  } else if (target.id === 'clear-all'){
    console.log('clear');
  } else if (target.id === 'ugency-filter')
  console.log('urgent');
}

function addTask() {
  var newTaskSpace = document.querySelector('#new-task-space');
  var newTask = document.querySelector('#task-item-input');
  if (newTask.value) {
    newTaskSpace.insertAdjacentHTML('afterbegin', `<div><img id="small-image" src="assets/delete.svg">${newTask.value}</div>`);
  }
}
