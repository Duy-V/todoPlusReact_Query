import { Todo } from "./../../models/todoList";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import todoServices from "../../services/todoServices";
import { MessageContext } from "../../context/MessageContext";
import { useContext } from "react";

interface AddTodoContext {
  previousTodos: Todo[];
}

const useUpdateTodo = () => {
  const queryClient = new QueryClient();
  const { setMessage, setModalOpen } = useContext(MessageContext);

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (newTodo: Todo) => todoServices.put(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setMessage("New item updated successfully!");
      setModalOpen(true); // open the modal
    },
    onError: () => {
      setMessage("Failed to updated new item.");
      setModalOpen(true); // open the modal
    },
  });
};

export default useUpdateTodo;
