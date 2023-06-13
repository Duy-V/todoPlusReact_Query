import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import APIClient, { newTodo } from "../../services/api-clients";
import { TodoWithoutId } from "../../models/todoList";
import todoServices from "../../services/todoServices";
import { Todo } from "../../store";
import { createContext, useContext, useState, ReactNode } from "react";
import { MessageContext } from "../../context/MessageContext";

const apiClient = new APIClient<Todo>("/todos");
interface AddTodoContext {
  previousTodos: Todo[];
}

// Create a provider component

const useAddTodo = () => {
  const queryClient = new QueryClient();
  const { setMessage, setModalOpen } = useContext(MessageContext);

  return useMutation<TodoWithoutId, Error, TodoWithoutId, AddTodoContext>({
    mutationFn: (newTodo: TodoWithoutId) => todoServices.post(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      setMessage("New item added successfully!");
      setModalOpen(true); // open the modal
    },
    onError: () => {
      setMessage("Failed to add new item.");
      setModalOpen(true); // open the modal
    },
  });
};

export default useAddTodo;
