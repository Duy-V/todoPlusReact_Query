import { Todo } from "../../models/todoList";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import todoServices from "../../services/todoServices";
import { useContext } from "react";
import { useQueryString } from "../../utils/utils";
import { toast } from "react-toastify";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useDeleteTodo = () => {
  const queryClient = new QueryClient();
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;
  return useMutation<number, Error, number, AddTodoContext>({
    mutationFn: (id: number) => todoServices.delete(id),
    onSuccess: () => {
      toast.success(`Xóa thành công student với id là ${id}`);
      queryClient.invalidateQueries({
        queryKey: ["todos", "list", page],
        exact: true,
      });
    },
    onError: () => {},
  });
};

export default useDeleteTodo;
