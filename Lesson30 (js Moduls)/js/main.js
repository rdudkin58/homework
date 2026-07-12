import {getTodosFromLocalStorage} from "./storage.js";
import {renderTodos, initTodoHandlers} from "./dom.js"

// {
//     id: 1,
//     text: "Todo",
//     is_completed: false,
// }

const todos = getTodosFromLocalStorage() || [];

document.addEventListener("DOMContentLoaded", () => {
  renderTodos(todos);
  initTodoHandlers(todos);
});
