import React from "react";
import Tag from "./Tag";
import useTags from "../../hooks/tagHook/useTags";
import { TagWithoutId } from "../../models/todoList";

function TagsList() {
  const { data } = useTags();
  console.log(data?.data);
  return (
    <div className="flex flex-row flex-wrap gap-5">
      {data?.data?.map((item: TagWithoutId, index: number) => (
        <Tag item={item} key={index} />
      ))}
    </div>
  );
}

export default TagsList;
