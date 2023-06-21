import { create } from "zustand";

interface TodoQuery {
  sortOrder?: string;
  searchText?: string;
}

interface TodoQueryStore {
  todoQuery: TodoQuery;
  setSearchText: (searchText: string) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useTodoQueryStore = create<TodoQueryStore>((set) => ({
  todoQuery: {},
  setSearchText: (searchText) => set(() => ({ todoQuery: { searchText } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({
      todoQuery: { ...store.todoQuery, sortOrder },
    })),
}));

export default useTodoQueryStore;
