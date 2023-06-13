import { useMutation, useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../../services/api-clients";
import { Todo } from "../../store";

const apiClient = new APIClient<Todo>("/todos");

const useTodo = (id: string | number) => {
  return useQuery<FetchResponse<Todo> | any>({
    queryKey: ["todos", id],
    queryFn: () => apiClient.get(id),
  });
};

export default useTodo;
