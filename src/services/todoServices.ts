import { Todo } from "../store";
import APIClient from "./api-clients";

export default new APIClient<Todo>("/todos");
