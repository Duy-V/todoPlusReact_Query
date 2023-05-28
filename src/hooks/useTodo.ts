import { useMutation, useQuery } from "@tanstack/react-query";
import APIClient, { newTodo } from "../services/api-clients";
import { Todo } from "../store";

const apiClient = new APIClient<Todo>("/todos");

const useTodo = (slug: string) =>{
    useQuery({
        queryKey: ["todos", slug],
        queryFn: () => apiClient.get(slug),
      })
}
   


export default useTodo;
