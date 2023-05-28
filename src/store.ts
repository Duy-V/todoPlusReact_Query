import { create } from "zustand";

interface TodoQuery {
  searchText?: string;
}

interface TodoQueryStore {
  todoQuery: TodoQuery;
  setSearchText: (searchText: string) => void;
}
export interface Todo {
  name: string;
  content: string;
  status: boolean;
  deadline: string;
  tags: string[];
}
const useTodoQueryStore = create<TodoQueryStore>((set) => ({
  todoQuery: {},
  //   addAnTodo: (todo:Todo) => set((prevState: Todo[]) => (
  //     { todos: [...prevState.todos, todo] }
  //   )),
  setSearchText: (searchText) => set(() => ({ todoQuery: { searchText } })),
}));

export default useTodoQueryStore;
