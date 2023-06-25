import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../../services/api-clients";
import { TagWithoutId } from "../../models/todoList";
import useTodoQueryStore from "../../store";
import Tag from "../../components/tag/Tag";
import { constructQueryString } from "../../utils/query";

// i think tags: todoId[], but i can not defines todoId
const apiClient = new APIClient<TagWithoutId>("/tags");

const useTags = () => {
  const todoQuery = useTodoQueryStore((s) => s.todoQuery);
  const params = {
    searchText: todoQuery.searchText,
    sortOrder: todoQuery.sortOrder,
  };
  const queryString = constructQueryString(params, "tagsList");

  return useQuery<FetchResponse<Tag> | any>({
    queryKey: ["tags", "list", todoQuery.searchText],
    queryFn: () => apiClient.getAll(queryString),
    staleTime: ms("5s"),
    keepPreviousData: true,
  });
};

export default useTags;
