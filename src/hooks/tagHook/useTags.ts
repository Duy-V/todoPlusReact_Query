import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../../services/api-clients";
import { TagWithoutId } from "../../models/todoList";
import useTodoQueryStore from "../../store";
import Tag from "../../components/tag/Tag";

// i think tags: todoId[], but i can not defines todoId
const apiClient = new APIClient<TagWithoutId>("/tags");

const useTags = () => {
  const todoQuery = useTodoQueryStore((s) => s.todoQuery);

  return useQuery<FetchResponse<Tag> | any>({
    queryKey: ["tags", "list", todoQuery.searchText],
    queryFn: () =>
      apiClient.getAll({
        params: {
          searchText: todoQuery.searchText,
        },
        source: "tagsList",

      }),
    staleTime: ms("5s"),
    keepPreviousData: true,
  });
};

export default useTags;
