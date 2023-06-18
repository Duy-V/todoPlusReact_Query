import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoWithoutId, BasicTodoSchema } from "./../../models/todoList";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAddTodo from "./../../hooks/todoHook/useAddTodo";
import { useNavigate } from "react-router-dom";
import useTags from "./../../hooks/tagHook/useTags";
import useUpdateTodo from "../../hooks/todoHook/useUpdateTodo";

type OptionType = { title: string };
interface TodoFormProps {
  isEditing: boolean;
  existingTodo: any;
}
const TodoForm: React.FC<TodoFormProps> = ({ isEditing, existingTodo }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<TodoWithoutId>({
    resolver: zodResolver(BasicTodoSchema),
  });

  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const { data } = useTags();
  const options: OptionType[] = data?.data ?? [];
  const tagsValue = useWatch({ control, name: "tags" });

  const onSubmit: SubmitHandler<TodoWithoutId> = (data) => {
    if (existingTodo) {
      updateTodo.mutate({ ...existingTodo, ...data });
    } else {
      addTodo.mutate(data);
    }
  };

  useEffect(() => {
    if (existingTodo) {
      setValue("name", existingTodo.name);
      setValue("content", existingTodo.content);

      const existingTags = existingTodo?.tags
        ?.map((tagTodo: any) => {
          return data.data.find((tag: any) => tag.title === tagTodo.title);
        })
        .filter(Boolean);
      setValue("tags", existingTags);

      const deadlineDate = new Date(existingTodo.deadline);

      setValue("deadline", existingTodo.deadline);
      setStartDate(deadlineDate);
    }
  }, [existingTodo, setValue, data?.data]);
  return (
    <div className="w-1/2 mx-auto mt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div>
          <label htmlFor="name" className="text-lg font-medium text-gray-700">
            Name:
          </label>
          <input
            {...register("name")}
            placeholder="Bill"
            id="name"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.name?.message && (
            <p className="text-red-500 text-xs italic">
              {errors.name?.message ?? ""}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="content"
            className="text-lg font-medium text-gray-700"
          >
            Content:
          </label>
          <textarea
            {...register("content")}
            id="content"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="task 1"
          />
          {errors.content?.message && (
            <p className="text-red-500 text-xs italic">
              {errors.content?.message ?? ""}
            </p>
          )}
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700">
            Tags:
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={options}
                  getOptionLabel={(option: OptionType) => option?.title}
                  onChange={(_, data: OptionType[]) => {
                    // If the last selected item is already in the array, remove it; otherwise, add it
                    const lastSelectedItem = data[data.length - 1];
                    const isAlreadySelected = field.value.some(
                      (item: OptionType) =>
                        item.title === lastSelectedItem.title
                    );
                    const newValue = isAlreadySelected
                      ? field.value.filter(
                          (item: OptionType) =>
                            item.title !== lastSelectedItem.title
                        )
                      : data;
                    field.onChange(newValue);
                  }}
                  // Use the watched value for the value of the Autocomplete component
                  value={tagsValue || []}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      fullWidth
                      className="mt-1"
                    />
                  )}
                />
              )}
            />
            {errors.tags?.message && (
              <p className="text-red-500 text-xs italic">
                {errors.tags?.message ?? ""}
              </p>
            )}
          </label>
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700">
            Date:
            <Controller
              control={control}
              name="deadline"
              render={({ field }) => (
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => {
                    if (date) {
                      setStartDate(date);
                      field.onChange(date.toISOString());
                    } else {
                      setStartDate(null);
                      field.onChange("");
                    }
                  }}
                  timeInputLabel="Time:"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  showTimeInput
                />
              )}
            />
            {errors.deadline?.message && (
              <p className="text-red-500 text-xs italic">
                {errors.deadline?.message ?? ""}
              </p>
            )}
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
