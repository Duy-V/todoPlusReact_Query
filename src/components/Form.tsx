import React from "react";

function Form() {
  
  return (
    <div className="modal-box flex gap-5">
      <div className="right-part flex-auto w-64">
        {" "}
        <input
          type="text"
          placeholder="Name of Todo"
          className="input input-bordered w-full max-w-xs mb-5"
        />
        <textarea
          placeholder="Bio"
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        ></textarea>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Deadline</span>
            <input type="checkbox" className="toggle" checked />
          </label>
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
        <div className="flex flex-wrap gap-2">
          <div className="badge badge-primary btn-sm">first</div>
          <div className="badge badge-secondary btn-sm">vital</div>
          <div className="badge badge-accent btn-sm">accent</div>
        </div>
      </div>
    </div>
  );
}

export default Form;
