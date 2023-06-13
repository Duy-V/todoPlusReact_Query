import { TodoWithoutId } from "./../models/todoList";
import APIClientTodo from "./api-clients";

export default new APIClientTodo<TodoWithoutId>("/todos");
