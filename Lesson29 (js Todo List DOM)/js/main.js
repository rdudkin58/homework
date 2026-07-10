"use strict";

// {
//     id: 1,
//     text: "Todo",
//     is_completed: false,
// }

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = (todoId) => `Todo with id ${todoId} not found`;

const getNewTodoId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

// const deleteTodoById = (todos, todoId) => {
//   return todos.filter((todo) => todo[todoKeys.id] !== todoId);
// };

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);
  if (todoIndex == -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};

const editTodoById = (todos, todoId, text) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);
  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  if (!text) {
    console.error("New todo is empty");
    return null;
  }
  todo[todoKeys.text] = text;
  return todo;
};

// При помощи метода querySelector получаем элементы .form, .input и .todos
// Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement

const formElement = document.querySelector(".form");
const inputElement = document.querySelector(".input");
const todosElement = document.querySelector(".todos");

const createTodoElement = (todo) => {
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo");
  todoElement.dataset.id = todo[todoKeys.id];
  todoElement.innerHTML = `
    <div class="todo-text">${todo[todoKeys.text]}</div>
    <div class="todo-actions">
      <button class="button-complete button">&#10004;</button>
      <button class="button-delete button">&#10006;</button>
    </div>
  `;
  todosElement.prepend(todoElement);
};

const handleCreateTodo = (todos, text) => {
  const todo = createTodo(todos, text);
  createTodoElement(todo);
};

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = inputElement.value.trim();
  inputElement.focus();
  inputElement.value = inputElement.defaultValue;
  if (!text) return;
  handleCreateTodo(todos, text);
});

todosElement.addEventListener("click", ({ target }) => {
  const todo = target.closest(".todo");
  if (!todo) return;

  const todoId = +todo.dataset.id;

  if (target.matches(".button-complete")) {
    completeTodoById(todos, todoId);
    todo.classList.toggle("completed");
  }
  if (target.matches(".button-delete")) {
    deleteTodoById(todos, todoId);
    todo.remove();
  }
});
