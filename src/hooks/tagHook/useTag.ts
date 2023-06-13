import { QueryClient, useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../../services/api-clients";
import { TagWithId } from "../../models/todoList";

const apiClient = new APIClient<TagWithId>("/tags");

const useTag = (id: number | string) => {
  return useQuery<FetchResponse<TagWithId> | any>({
    queryKey: ["tags", id],
    queryFn: () => apiClient.get(id),
  });
};

export default useTag;
