import { useNavigate } from "react-router-dom";
import useTags from "../../hooks/tagHook/useTags";
import useDeleteTodo from "./../../hooks/todoHook/useDeleteTodo";
import DeleteComfirm from "../DeleteComfirm";
import { useEffect, useState } from "react";
import { convertUtcToVietnamTime } from "../../utils/timezones";
import useUpdateTodo from "../../hooks/todoHook/useUpdateTodo";

function Todo({ data, page }: any) {
  const { data: tags, isSuccess, isError } = useTags();
  const [isChecked, setIsChecked] = useState(data.status);

  const navigate = useNavigate(); // Initialize useNavigate
  const deleteTodoItem = useDeleteTodo();
  const updateStatusTodo = useUpdateTodo();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleEditClick = () => {
    navigate(`/todos/${data.id}`, { state: { pageNumber: page } });
  };
  const selectedTags = tags?.data?.filter((dataTag: any) =>
    data?.tags?.some((todoTag: any) => todoTag?.title === dataTag?.title)
  );
  const handleDelete = () => {
    setItemToDelete(data.name);
    setIsDialogOpen(true);
  };
  const deleteTodo = () => {
    deleteTodoItem.mutate(data?.id);
    setIsDialogOpen(false);
  };
  const handleCheck = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    updateStatusTodo.mutate({ ...data, status: newCheckedState });
  };

  return (
    <>
      <DeleteComfirm
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={deleteTodo}
        item={itemToDelete}
        action="delete"
      />
      <div className="flex flex-row flex-wrap gap-5">
        <div className="flex-row card w-96 bg-base-100 shadow-xl p-2">
          <div className="right-part w-60 flex-auto ">
            <div className="card-body">
              <h2 className="card-title">
                {data?.name}
                <div className="badge badge-secondary"></div>
              </h2>
              <p>{data?.content}</p>
              <p>
                Deadline:{" "}
                {convertUtcToVietnamTime(data?.deadline).format(
                  "ddd MMM D YYYY HH:mm"
                )}
              </p>
              <div className="card-actions justify-end">
                {selectedTags?.map((tag: any, index: number) => (
                  <div
                    key={index}
                    className="badge badge-outline"
                    style={{ background: tag.color }}
                  >
                    {tag?.title}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="left-part flex flex-col flex-auto w-32">
            <div className="flex flex-col">
              <button className="btn btn-outline btn-primary btn-sm mb-3">
                View
              </button>
              <button
                className="btn btn-outline btn-secondary btn-sm mb-3"
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="btn btn-outline btn-accent btn-sm mb-3"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
            <label className="cursor-pointer label">
              <span className="label-text">Finished</span>
              <input
                type="checkbox"
                onClick={handleCheck}
                checked={data.status}
                className="checkbox checkbox-accent"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
