import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../services/api-clients";
import useTodoQueryStore from "../store";

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

const useTodos = () => {
  const todoQuery = useTodoQueryStore((s) => s.todoQuery);

  return useInfiniteQuery<FetchResponse<Todo> | any>({
    queryKey: ["todos", todoQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          pageParams: 1,
          // searchText:''
        },
      }),
    staleTime: ms("24h"),
  });
};

export default useTodos;
