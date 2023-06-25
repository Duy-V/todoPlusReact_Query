import React from "react";
import Tag from "./Tag";
import useTags from "../../hooks/tagHook/useTags";
import { TagWithoutId } from "../../models/todoList";
import InfiniteScroll from "react-infinite-scroll-component";

function TagsList() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } = useTags();

  const fetchedTagsCount =
    data?.pages.reduce((total, page) => total + page.data.length, 0) || 0;
  console.log(fetchedTagsCount);
  return (
    <InfiniteScroll
      dataLength={fetchedTagsCount}
      hasMore={!!hasNextPage}
      next={fetchNextPage}
      loader={<div>Loading...</div>}
    >
      <div className="flex flex-row flex-wrap gap-5">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.data.map((item: TagWithoutId, index: number) => (
              <Tag item={item} key={index} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default TagsList;
