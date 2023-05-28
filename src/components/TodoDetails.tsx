import React from "react";
import Form from "./Form";
import useTodo from "../hooks/useTodo";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAddTodo from "../hooks/useAddTodo";
import { useRef } from "react";
import { Formik, useFormik } from "formik";

function TodoDetail({ ...props }: any) {
  // const { slug } = useParams();
  // const { data } = useTodo(slug!);
  // const { data } = useTodo(1);
  // console.log(data);
  // const addTodo = useUpdateTodo(() => {
  //   console.log(data);
  // });

  // console.log(
  //   addTodo.mutate({
  //     name: "learning React Advanced 2805",
  //     content: "key concepts must finish today: usehook",
  //     status: true,
  //     deadline: "20/4/2023",
  //     tags: ["key concepts", "front end"],
  //   })
  // );

  const formik = useFormik({
    initialValues: {
      content: "",
      name: "",
      status: false,
      deadline: "",
      tags: [],
    },
    // validate: (values) => {
    //   const errors = {};
    //   if (!values.name) {
    //     errors.name = "Required";
    //   }
    //   return errors;
    // },
    onSubmit: (values, { setSubmitting }) => {
      // addTodo.mutate({
      //   name: "learning React Advanced 2805",
      //   content: "key concepts must finish today: usehook",
      //   status: true,
      //   deadline: "20/4/2023",
      //   tags: ["key concepts", "front end"],
      // });
      console.log(values);
      // setSubmitting(!isSubmitting);
    },
  });
  return (
    <div>
      {/* <Form /> */}
      <form noValidate onSubmit={formik.handleSubmit} {...props}>
        <div className="modal-box flex gap-5">
          <div className="right-part flex-auto w-64">
            {" "}
            <input
              type="text"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder="Name of Todo"
              className="input input-bordered w-full max-w-xs mb-5"
            />
            <textarea
              // type="text"
              name="content"
              onChange={formik.handleChange}
              value={formik.values.content}
              placeholder="Bio"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
            ></textarea>
            <div className="form-control">
              <label className="label cursor-pointer">
                <a
                  className="label-text"
                  type="text"
                  name="deadline"
                  onChange={formik.handleChange}
                  value={formik.values?.deadline}
                >
                  Deadline
                </a>
              </label>
            </div>
          </div>

          <div className="left-part flex flex-col flex-auto w-32">
            {/* <div className="flex flex-col">
              <button className="btn btn-outline btn-primary btn-sm mb-3">
                View
              </button>
              <button className="btn btn-outline btn-secondary btn-sm mb-3">
                Edit
              </button>
              <button className="btn btn-outline btn-accent btn-sm mb-3">
                Delete
              </button>
            </div> */}
            <div className="flex flex-wrap gap-2">
              <div className="badge badge-primary btn-sm">first</div>
              <div className="badge badge-secondary btn-sm">vital</div>
              <div className="badge badge-accent btn-sm">accent</div>
            </div>
          </div>
          <button type="submit" disabled={formik.isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoDetail;
