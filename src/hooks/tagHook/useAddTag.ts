import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../../services/api-clients";
import { TagWithoutId } from "../../models/todoList";
import todoServices from "../../services/todoServices";
import tagServices from "../../services/tagServices";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const apiClient = new APIClient<any>("/tags");
interface AddTagContext {
  previousTodos: TagWithoutId[];
}

const useAddTag = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  return useMutation<TagWithoutId, Error, TagWithoutId, AddTagContext>({
    mutationFn: (newTag: TagWithoutId) => tagServices.post(newTag),
    onSuccess: () => {
      queryClient.invalidateQueries(["tags", "list"]);
      navigate(`/tags/list`);
    },
    onError: () => {},
  });
};

export default useAddTag;
