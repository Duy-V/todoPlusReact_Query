import useTodos from "../../hooks/todoHook/useTodos";
import Pagination from "../Pagination";
import Todo from "./Todo";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQueryString } from "../../utils/utils";
import { useEffect, useState } from "react";
const LIMIT = 4;

const TodoList = () => {
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;
  const { data: todos } = useTodos(page, LIMIT);
  const totalStudentsCount = Number(todos?.headers?.["x-total-count"] || 0);
  const totalPage = Math.ceil(totalStudentsCount / LIMIT);

  return (
    // <InfiniteScroll
    //   dataLength={currentPage}
    //   hasMore={!!hasNextPage}
    //   next={() => fetchNextPage()}
    //   // loader={<Spinner />}
    // >
    <div className=" flex flex-col justify-center">
      <div className="flex justify-center flex-wrap gap-5">
        {todos?.data?.map((todo: any, index: number) => (
          <Todo key={index} data={todo} location={location} page={page} />
        ))}
      </div>
      <div className="flex justify-center py-4">
        <Pagination totalPage={totalPage} page={page} />
      </div>
    </div>
    // </InfiniteScroll>
  );
};

export default TodoList;
