import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import APIClient, { newTodo } from "../services/api-clients";
import { Todo } from "../store";
import todoServices from "../services/todoServices";

const apiClient = new APIClient<Todo>("/todos");
interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = new QueryClient();
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoServices.post,

    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (todos = []) => [
        newTodo,
        ...todos,
      ]);

      onAdd();

      return { previousTodos };
    },

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },
  });
};

export default useAddTodo;
