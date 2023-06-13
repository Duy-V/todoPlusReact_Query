import React, { useState, useEffect } from "react";
import TagForm from "./../components/tag/TagForm";
import useTag from "../hooks/tagHook/useTag";
import { useParams } from "react-router-dom";

function TagEdittedPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [existingTag, setExistingTag] = useState(null);
  const { id } = useParams(); // Get the id parameter from the URL
  const { data: tag } = useTag(id || "");
  console.log(tag);
  useEffect(() => {
    if (tag) {
      setIsEditing(true);
      setExistingTag(tag);
    } else {
      setIsEditing(false);
      setExistingTag(null);
    }
  }, [tag]);
  console.log(existingTag);
  return (
    <div>
      <h1>Edit Tag</h1>
      <TagForm isEditing={isEditing} existingTag={existingTag} />
    </div>
  );
}

export default TagEdittedPage;
