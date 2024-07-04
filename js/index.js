$(document).ready(function () {

  let activeTab = '';
  let todosLoaded = false;

  // TODO: Get API data
  const apiURL = 'https://jsonplaceholder.typicode.com/todos/';

  // TODO: Get API data
  if (sessionStorage.getItem('todos') === null) {
    getTodos();
  }
  else {
    renderTodos(JSON.parse(sessionStorage.getItem('todos')));
  }

  console.log('index.js ejecutado');

  $('.nav-item .nav-link').click(function (event) {
    event.preventDefault();
    if (activeTab ===  this.id) {
      return
    }

    // Clean active class from all tabs
    $('.navbar-nav .nav-link').removeClass('active');

    // Hide all tabs
    $('[class*="tab-"]:not(.visually-hidden)').each(function () {
      $(this).addClass('visually-hidden');
    });

    // Add title to active tab
    $('.tabs-title').text(this.textContent);

    // Add active class to current tab
    $(this).addClass('active');

    // Show current tab
    $('.tab-' + this.id).removeClass('visually-hidden');

    // $('.tabs').load('../' + this.id + '.html');

    // Update btn id activated
    activeTab = this.id;
  });

  // TODO: Get API data
  function getTodos() {
    $.get(apiURL, function (todos) {
      // $('.tasks').data('task',  todos);
      // $('.tasks').data('task').length > 0 && renderTodos(todos);
      sessionStorage.setItem('todos', JSON.stringify(todos));
      renderTodos(todos);
      todosLoaded = true; // Set flag to true
    });
  }

  // TODO: Render API data
  function renderTodos(todos) {
    let taskBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris, ac elementum ultrices mauris. Cursus urna';
    let allTasksHTML = '';
    let count = 0;
    // $('.tasks').empty();
    todos.forEach(todo => {
      taskBody = todo.body === undefined ? taskBody : todo.body;
      if (count < 3) {
      // console.log(todo);
        let taskElement = `
          <div class="task" id="${todo.id}">
            <h2 class="task-title col-11">${todo.title}</h2>
            <div class="task-content d-flex">
              <p class="task-description col-10 text-justify">${taskBody}</p>
              <div class="div-trash-ico col-2">
                <img class="trash-icon" alt="Trash Icon">
              </div>
            </div>
          </div>
        `;
        allTasksHTML += taskElement;
        count++;
      }
    });
    $('.tasks').append(allTasksHTML);
  }
    // Activate data tab by default
  // $('#data').addClass('active');
  $('#data').click();

  $('.menu-icon').click(function () {
    $(".navbar" ).toggle();
  });

  // TODO: Render API data
  function renderTodo(todo) {
    let taskBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris, ac elementum ultrices mauris. Cursus urna';
    taskBody = todo.description === undefined ? taskBody : todo.description;
    let allTasksHTML = '';
    // $('.tasks').empty();
    // console.log(todo);
    let taskElement = `
      <div class="task" id="${todo.id}">
        <h2 class="task-title col-11">${todo.title}</h2>
        <div class="task-content d-flex">
          <p class="task-description col-10 text-justify">${taskBody}</p>
          <div class="div-trash-ico col-2">
            <img class="trash-icon" alt="Trash Icon">
          </div>
        </div>
      </div>
    `;
    allTasksHTML += taskElement;
    $('.tasks').append(allTasksHTML);
  }

  $('.save-task').data('renderTodo', renderTodo);
}); // end of document ready


