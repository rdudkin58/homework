// При помощи метода querySelector получаем элементы .form, .input и .todos
// Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement

import { todoKeys } from "./constants.js";
import { createTodo, completeTodoById, deleteTodoById } from "./service.js";
import { setTodosToLocalStorage } from "./storage.js";

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
  return todoElement;
};

export const renderTodos = (todos) => {
  todosElement.innerHTML = "";
  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    if (todo[todoKeys.is_completed]) todoElement.classList.add("completed");
    todosElement.prepend(todoElement);
  });
};

const handleCreateTodo = (todos, text) => {
  const todo = createTodo(todos, text);
  const todoElement = createTodoElement(todo);
  setTodosToLocalStorage(todos);
  todosElement.prepend(todoElement);
};

export const initTodoHandlers = (todos) => {
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
      setTodosToLocalStorage(todos);
      todo.classList.toggle("completed");
    }
    if (target.matches(".button-delete")) {
      deleteTodoById(todos, todoId);
      setTodosToLocalStorage(todos);
      todo.remove();
    }
  });
};
