import React from "react";

function Todo({ data }: any) {
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
            {data?.tags?.map((tag: any, index: number) => (
              <div key={index} className="card-actions justify-end">
                <div className="badge badge-outline">{tag?.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="left-part flex flex-col flex-auto w-32">
          <div className="flex flex-col">
            <button className="btn btn-outline btn-primary btn-sm mb-3">
              View
            </button>
            <button className="btn btn-outline btn-secondary btn-sm mb-3">
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
