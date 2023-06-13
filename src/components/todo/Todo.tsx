import { useNavigate } from "react-router-dom";
import useTags from "../../hooks/tagHook/useTags";
import MessageDisplay from "../MessageDisplay";

function Todo({ data }: any) {
  const { data: tags } = useTags();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEditClick = () => {
    navigate(`/todos/${data.id}`, { state: { existingTodo: data } });
  };
  return (
    <div className="flex flex-row flex-wrap gap-5">
      <div className="flex-row card w-96 bg-base-100 shadow-xl p-2">
        <div className="right-part w-60 flex-auto ">
          {/* <figure>
                  <img
                    src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Shoes"
                  />
                </figure> */}
          <div className="card-body">
            <h2 className="card-title">
              {data?.name}
              <div className="badge badge-secondary"></div>
            </h2>
            <p>{data?.content}</p>
            {tags?.data
              ?.filter((tag: any) => data?.idTagsList?.includes(tag.id))
              ?.map((tag: any, index: number) => (
                <div key={index} className="card-actions justify-end">
                  <div
                    className="badge badge-outline"
                    style={{ background: tag.color }}
                  >
                    {tag?.title}
                  </div>
                </div>
              ))}
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
            <button className="btn btn-outline btn-accent btn-sm mb-3">
              Delete
            </button>
          </div>
          <label className="cursor-pointer label">
            <span className="label-text">Finished</span>
            <input
              type="checkbox"
              checked
              className="checkbox checkbox-accent"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Todo;
