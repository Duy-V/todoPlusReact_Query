import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../../services/api-clients";
import useTodoQueryStore from "../../store";
import { constructQueryString } from "../../utils/query";

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
  const params = {
    searchText: todoQuery.searchText,
    // sortOrder: "desc",
    sortOrder: todoQuery.sortOrder,
    page: page,
    limit: LIMIT,
  };

  const queryString = constructQueryString(params, "todoList");

  return useQuery<FetchResponse<Todo> | any>({
    queryKey: [
      "todos",
      "list",
      page,
      todoQuery.searchText,
      todoQuery.sortOrder,
    ],
    queryFn: () => apiClient.getAll(queryString),
    staleTime: ms("5s"),
    keepPreviousData: true,
    retry: 0,
  });
};

export default useTodos;
