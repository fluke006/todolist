const elForm = document.querySelector('.form');
const elInput = document.querySelector('.todo__input');
const elList = document.querySelector('.todo__list');

const elAllBtn = document.querySelector('.all__btn');
const elCompletedBtn = document.querySelector('.completed__btn');
const elUncompletedBtn = document.querySelector('.uncompleted__btn');
const elAllCount = document.querySelector('.all__count');
const elCompletedCount = document.querySelector('.completed__count');
const elUncompletedCount = document.querySelector('.uncompleted__count');

const elTodosControls = document.querySelector('.todo__controls');

const localTodo = JSON.parse(window.localStorage.getItem('todos'));

const todos = localTodo || [];

function updateTodos() {
	renderTodos(todos, elList);
	window.localStorage.setItem('todos', JSON.stringify(todos));
}

updateTodos()

function renderTodos(arr, node) {
	node.innerHTML = null;

	const allCount = arr.length;
	const completedCount = arr.filter(
		(row) => row.isCompleted === true,
	).length;

	elAllCount.textContent = allCount;
	elCompletedCount.textContent = completedCount;
	elUncompletedCount.textContent = allCount - completedCount;

	arr.forEach((todo) => {
		const newLi = document.createElement('li');
		const newBtn = document.createElement('button');
		const newInput = document.createElement('input');

		newLi.textContent = todo.title;
		newBtn.textContent = 'Delete';

		newInput.type = 'checkbox';

		newLi.setAttribute('class', 'todo__item');
		newInput.setAttribute('class', 'chexbox__todo');
		newBtn.setAttribute('class', 'delete__btn');
		newBtn.dataset.todoId = todo.id;
		newInput.dataset.todoId = todo.id;

      if (todo.isCompleted) {
			newInput.checked = true;
			newLi.style.textDecoration = 'line-through';
		}

		newLi.appendChild(newInput);
		newLi.appendChild(newBtn);
		node.appendChild(newLi);
	});
}

elList.addEventListener('click', (evt) => {
	if (evt.target.matches('.delete__btn')) {
		const todoId = Number(evt.target.dataset.todoId);
		const foundTodoIndex = todos.findIndex((todo) => todo.id === todoId);

		todos.splice(foundTodoIndex, 1);

		updateTodos()
	} else if (evt.target.matches('.chexbox__todo')) {
		const todoId = Number(evt.target.dataset.todoId);
		const foundTodo = todos.find((todo) => todo.id === todoId);

		foundTodo.isCompleted = !foundTodo.isCompleted;
	}
});

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const inputValue = elInput.value.trim();

	const todo = {
		id: todos[todos.length - 1]?.id + 1 || 0,
		title: inputValue,
		isCompleted: false,
	};

	todos.push(todo);
	elInput.value = null;

	updateTodos()
});

elTodosControls.addEventListener('click', (evt)=>{
   if (evt.target.matches('.all__btn')) {
      renderTodos(todos, elList);
   }else if (evt.target.matches('.completed__btn')) {
      const filterTodo = todos.filter((todo)=> todo.isCompleted === true);

      renderTodos(filterTodo, elList);
   }else if (evt.target.matches('.uncompleted__btn')) {
      const filterTodo = todos.filter((todo)=> todo.isCompleted === false);

      renderTodos(filterTodo, elList);
   }
});