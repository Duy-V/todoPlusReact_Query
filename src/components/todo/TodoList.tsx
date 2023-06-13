import { useState, useEffect } from "react";
import useTodos from "../../hooks/todoHook/useTodos";
import Pagination from "../Pagination";
import Todo from "./Todo";
import InfiniteScroll from "react-infinite-scroll-component";

const TodoList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: todos } = useTodos(currentPage);
  console.log(todos?.data);
  // const {
  //   data,
  //   error,
  //   isLoading,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage,
  // } = useTodos();
  // console.log(data?.pages[0], hasNextPage);
  const [lastPage, setLastPage] = useState<number>(1);
  useEffect(() => {
    const linkHeader: any = todos?.headers?.get("Link");
    if (linkHeader) {
      const lastPageLink = linkHeader
        .split(",")
        .find((link: any) => link.includes('rel="last"'));
      const urlMatch = lastPageLink.match(/<([^>]+)>/);
      if (urlMatch) {
        const url: any = urlMatch[1];
        const page = parseInt(url[url.length - 1], 10);
        if (!isNaN(page)) {
          setLastPage(page);
        }
      }
    }
  }, [todos]);

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
          <Todo key={index} data={todo} />
        ))}
      </div>
      <div className="flex justify-center py-4">
        <Pagination
          // data={todos?.pages[0]?.data}
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
    // </InfiniteScroll>
  );
};

export default TodoList;
