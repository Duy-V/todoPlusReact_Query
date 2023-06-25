import { Todo } from "../../models/todoList";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useQueryString } from "../../utils/utils";
import { toast } from "react-toastify";
import tagServices from "../../services/tagServices";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useDeleteTag = () => {
  const queryClient = new QueryClient();
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;
  return useMutation<number, Error, number, AddTodoContext>({
    mutationFn: (id: number) => tagServices.delete(id),
    onSuccess: () => {
      toast.success(`Xóa thành công tag với id là ${id}`);
      queryClient.invalidateQueries({
        queryKey: ["tags", "list", page],
        // exact: true,
      });
    },
    onError: () => {},
  });
};

export default useDeleteTag;
