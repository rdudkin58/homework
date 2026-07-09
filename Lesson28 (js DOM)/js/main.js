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

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const allTodos = document.querySelector(".todos");

const createTodoElement = (text) => {
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo");
  todoElement.innerHTML = `
    <div class="todo-text">${text}</div>
    <div class="todo-actions">
      <button class="button-complete button">&#10004;</button>
      <button class="button-delete button">&#10006;</button>
    </div>
  `;
  allTodos.append(todoElement);
};

const handleCreateTodo = (todos, text) => {
  createTodo(todos, text);
  createTodoElement(text);
};
