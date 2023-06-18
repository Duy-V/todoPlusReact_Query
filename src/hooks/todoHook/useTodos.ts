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
  return useQuery<FetchResponse<Todo> | any>({
    queryKey: ["todos", "list", page],
    queryFn: () => apiClient.getAll(page, LIMIT),

    staleTime: ms("5s"),
    keepPreviousData: true,
    retry: 0,
  });
};

export default useTodos;
