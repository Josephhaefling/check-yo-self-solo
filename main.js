// var taskTitle = document.querySelector('#task-title');
// var newTask = document.querySelector('#new-task');
// var makeList = document.querySelector('#make-list');
// var clearAll = document.querySelector('#clear-all');
// var urgencyFilter = document.querySelector('#urgency-filter');
// var searchInput = document.querySelector('#search-input');
// var submitSearch = document.querySelector('#submit-search-button');
var navInput = document.querySelector('#all-nav-btn');
var mainHeader = document.querySelector('#main-header')


navInput.addEventListener('click', btnClicked);
// mainHeader.addEventListener('click', search);

function btnClicked () {
  var target = event.target ;
  if (target.classList[0] === 'js-nav-btn') {
    determineBtn(target);
  }
}

function determineBtn(target) {
  if (target.id === 'add-btn-img') {
    console.log('add');
  } else if (target.id === 'make-list'){
  console.log('make');
} else if (target.id === 'clear-all'){
    console.log('clear');
  } else if (target.id === 'ugency-filter')
  console.log('urgent');
}
