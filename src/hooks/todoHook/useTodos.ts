import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../../services/api-clients";
import useTodoQueryStore from "../../store";

export interface Todo {
  id: number;
  content: string;
  name: string;
  status: boolean;
  deadline: string;
  tags: number[];
}

// i think tags: todoId[], but i can not defines todoId
const apiClient = new APIClient<Todo>("/todos");

const useTodos = (page: number, LIMIT: number) => {
  const todoQuery = useTodoQueryStore((s) => s.todoQuery);

  return useQuery<FetchResponse<Todo> | any>({
    queryKey: [
      "todos",
      "list",
      page,
      todoQuery.searchText,
      todoQuery.sortOrder,
    ],
    queryFn: () =>
      apiClient.getAll({
        params: {
          searchText: todoQuery.searchText,
          sortOrder: todoQuery.sortOrder,
          page: page,
          limit: LIMIT,
        },
        source: "todoList",
      }),
    staleTime: ms("5s"),
    keepPreviousData: true,
    retry: 0,
  });
};

export default useTodos;
