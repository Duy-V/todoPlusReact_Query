import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import APIClient, { newTodo } from "../../services/api-clients";
import { TodoWithoutId } from "../../models/todoList";
import todoServices from "../../services/todoServices";
import { Todo } from "../../store";
import { createContext, useContext, useState, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const apiClient = new APIClient<Todo>("/todos");
interface AddTodoContext {
  previousTodos: Todo[];
}

// Create a provider component

const useAddTodo = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const pageNumber = location.state?.pageNumber;
  return useMutation<TodoWithoutId, Error, TodoWithoutId, AddTodoContext>({
    mutationFn: (newTodo: TodoWithoutId) => todoServices.post(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos", "list", pageNumber]);
      navigate(`/todos?page=${pageNumber}`);
    },
    onError: () => {},
  });
};

export default useAddTodo;
