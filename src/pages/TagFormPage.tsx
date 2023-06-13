import React from "react";
import { useParams, useLocation } from "react-router-dom";
import TagForm from "./../components/tag/TagForm";

function TagFormPage() {
  return (
    <div>
      <h1>Create a new tag</h1>
      <TagForm isEditing={false} existingTag={null} />
    </div>
  );
}

export default TagFormPage;
