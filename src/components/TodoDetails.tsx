import React, { useState } from "react";
import Form from "./Form";
import useTodo from "../hooks/useTodo";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAddTodo from "../hooks/useAddTodo";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { OptionType } from "../store";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import dayjs from "dayjs";
import DateTimePicker from "react-datetime-picker";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoSchema } from "../models/todoList";
import type { Todo } from "../models/todoList";

function TodoDetail({ ...props }: any) {
  // const { values, handleChange, resetForm } = useForm({
  //   name: "",
  //   content: "",
  //   dealine: "",
  //   tags: [],
  // });
  const addTodo = useAddTodo();
  const options: OptionType[] = [
    { title: "Option 1" },
    { title: "Option 2" },
    { title: "Option 3" },
    { title: "Option 4" },
    { title: "Option 5" },
    { title: "Option 6" },
    // Add more options here
  ];
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  const [dateTime, setDateTime] = useState<Date | null>(null);
  const handleChangeTags = (event: any, newTags: OptionType[]) => {
    event.preventDefault();
    setSelectedOptions(newTags);
    console.log(newTags);
  };
  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   addTodo.mutate({ ...values, tags: [...selectedOptions] });
  //   console.log(values);
  //   resetForm();
  //   setSelectedOptions([]);
  // };
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<Todo>({
    resolver: zodResolver(TodoSchema),
  });

  const onSubmit: SubmitHandler<Todo> = (data) => {
    console.log(data.name);
    console.log(data);
  };

  return (
    <div>
      {/* <Form /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-3xl gap-2 mx-auto"
      >
        <label htmlFor="name" className="text-xl text-white">
          Name:
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="rounded-md text-xl p-2"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
            {errors.name?.message}
          </p>
        )}

        <label htmlFor="content" className="text-xl text-white">
          Content:
        </label>
        <input
          id="content"
          type="text"
          {...register("content")}
          className="rounded-md text-xl p-2"
          placeholder="task 1"
        />
        {errors.content && (
          <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
            {errors.content?.message}
          </p>
        )}
        <label htmlFor="content" className="text-xl text-white">
          Deadline:
        </label>
        <DateTimePicker
          value={dateTime}
          onChange={(dateTime) => setDateTime(dateTime)}
          {...register("deadline")}
        />
        <label htmlFor="content" className="text-xl text-white">
          Tags:
        </label>
        <Autocomplete
          multiple
          limitTags={20}
          id="multiple-limit-tags"
          options={options}
          getOptionLabel={(option: OptionType) => option.title}
          {...register("tags")}
          onChange={handleChangeTags}
          value={selectedOptions}
          renderInput={(params) => (
            <TextField {...params} label="Tags" placeholder="Favorites" />
          )}
          sx={{ width: "500px" }}
        />
        <button
          type="submit"
          className="text-3xl bg-gray-300 p-2 rounded-md max-w-[10rem]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TodoDetail;


