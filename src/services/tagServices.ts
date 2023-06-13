import { TagWithoutId } from "../models/todoList";
import APIClient from "./api-clients";

export default new APIClient<TagWithoutId>("/tags");
