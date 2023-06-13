import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { TagWithId } from "../../models/todoList";
import tagServices from "../../services/tagServices";
import { useContext } from "react";
import { MessageContext } from "../../context/MessageContext";

interface AddTagContext {
  previousTodos: TagWithId[];
}

const useUpdateTag = () => {
  const queryClient = new QueryClient();
  const { setMessage, setModalOpen } = useContext(MessageContext);

  return useMutation<TagWithId, Error, TagWithId, AddTagContext>({
    mutationFn: (newTag: TagWithId) => tagServices.put(newTag),
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
      setMessage("Tag updated successfully!");
      setModalOpen(true); // open the modal
    },
    onError: () => {
      setMessage("Failed to updated tag.");
      setModalOpen(true); // open the modal
    },
  });
};

export default useUpdateTag;
