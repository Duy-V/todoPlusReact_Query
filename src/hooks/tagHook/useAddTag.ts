import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../../services/api-clients";
import { TagWithoutId } from "../../models/todoList";
import todoServices from "../../services/todoServices";
import tagServices from "../../services/tagServices";
import { useContext } from "react";
import { MessageContext } from "../../context/MessageContext";

const apiClient = new APIClient<any>("/tags");
interface AddTagContext {
  previousTodos: TagWithoutId[];
}

const useAddTag = () => {
  const queryClient = new QueryClient();
  const { setMessage, setModalOpen } = useContext(MessageContext);

  return useMutation<TagWithoutId, Error, TagWithoutId, AddTagContext>({
    mutationFn: (newTag: TagWithoutId) => tagServices.post(newTag),
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
      setMessage("Tag added successfully!");
      setModalOpen(true); // open the modal
    },
    onError: () => {
      setMessage("Failed to added tag.");
      setModalOpen(true); // open the modal
    },
  });
};

export default useAddTag;
