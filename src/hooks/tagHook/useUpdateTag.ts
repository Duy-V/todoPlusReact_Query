import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { TagWithId } from "../../models/todoList";
import tagServices from "../../services/tagServices";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

interface AddTagContext {
  previousTodos: TagWithId[];
}

const useUpdateTag = () => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  return useMutation<TagWithId, Error, TagWithId, AddTagContext>({
    mutationFn: (newTag: TagWithId) => tagServices.put(newTag),
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
      navigate(`/tags/list`);
    },
    onError: () => {},
  });
};

export default useUpdateTag;
