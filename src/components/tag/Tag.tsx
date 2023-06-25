import React, { useState } from "react";
import { TagWithId, TagWithoutId } from "../../models/todoList";
import { useNavigate } from "react-router-dom"; // Import useHistory
import DeleteComfirm from "../DeleteComfirm";
import useDeleteTag from "../../hooks/tagHook/useDeleteTag";

function Tag({ item }: TagWithId) {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemTagDelete, setItemTagDelete] = useState(null);

  const deleteTagItem = useDeleteTag();
  const handleDelete = () => {
    setItemTagDelete(item.name);
    setIsDialogOpen(true);
  };
  const deleteTodo = () => {
    deleteTagItem.mutate(item?.id);
    setIsDialogOpen(false);
  };
  const handleEditClick = () => {
    navigate(`/tags/${item.id}`, { state: { existingTag: item } });
  };
  return (
    <>
      <DeleteComfirm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={deleteTodo}
        item={itemTagDelete}
        action="delete"
      />
      <div
        className="card w-96  text-primary-content mt-5"
        style={{ background: item.color }}
      >
        <div className="card-body">
          <h2 className="card-title">Tag Item</h2>
          <p>{item.title}</p>
          <div className="card-actions justify-end">
            <button className="btn" onClick={handleDelete}>Delete</button>
            <button className="btn" onClick={handleEditClick}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tag;
