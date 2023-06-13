import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../../services/api-clients";
import useTodoQueryStore from "../../store";

export interface Todo {
  id: number;
  content: string;
  name: string;
  status: boolean;
  deadline: string;
  tags: number[];
}

// i think tags: todoId[], but i can not defines todoId
const apiClient = new APIClient<Todo>("/todos");

const useTodos = (currentPage: number) => {
  // const useTodos = () => {
  return useQuery<FetchResponse<Todo> | any>({
    // queryKey: ["todos"],
    queryKey: ["todos", currentPage],
    queryFn: () => apiClient.getAll(currentPage),

    staleTime: ms("24h"),
    keepPreviousData: true,
  });

  // queryFn: ({ pageParam = 1 }) =>
  //   apiClient.getAll({
  //     params: {
  //       // genres: gameQuery.genreId,
  //       // parent_platforms: gameQuery.platformId,
  //       // ordering: gameQuery.sortOrder,
  //       // search: gameQuery.searchText,
  //       page: pageParam,
  //     },
  //   }),

  // getNextPageParam: (lastPage, allPages) => {
  //   console.log(lastPage, allPages);
  //   return lastPage.next ? allPages.length + 1 : undefined;
  // },
};

export default useTodos;

// queryFn:  () => apiClient.getAll(currentPage),

//   staleTime: ms("24h"),
//   keepPreviousData: true,
// }),
