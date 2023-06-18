import { Todo } from "./../../models/todoList";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import todoServices from "../../services/todoServices";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQueryString } from "../../utils/utils";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useUpdateTodo = () => {
  // get pageNumber from todoForm component (get the route undirectly)

  const queryClient = new QueryClient();
  const location = useLocation();
  const pageNumber = location.state?.pageNumber;
  const navigate = useNavigate();
  // get pageNumber from todo component (get the route directly)
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;
  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (newTodo: Todo) => todoServices.put(newTodo),
    onSuccess: () => {
      toast.success("Todo updated successfully");
      pageNumber
        ? queryClient.invalidateQueries({
            queryKey: ["todos", "list", pageNumber],
            exact: true,
          })
        : queryClient.invalidateQueries({
            queryKey: ["todos", "list", page],
            exact: true,
          });
      navigate(`/todos?page=${pageNumber || page}`);
    },
  });
};

export default useUpdateTodo;
