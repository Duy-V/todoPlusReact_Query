import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../../services/api-clients";
import { TagWithoutId } from "../../models/todoList";

// i think tags: todoId[], but i can not defines todoId
const apiClient = new APIClient<TagWithoutId>("/tags");

const useTags = () => {
  return useQuery<FetchResponse<TagWithoutId> | any>({
    queryKey: ["tags"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("24h"),
    keepPreviousData: true,
  });
};

export default useTags;
