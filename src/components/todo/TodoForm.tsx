import { useEffect, useState } from "react";
import {
  SubmitHandler,
  useForm,
  useWatch,
  useController,
} from "react-hook-form";
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
import { useControlledInput } from "../../hookForm/useControlledInput";
import { useControlledAutocomplete } from "../../hookForm/useControlledAutocomplete";
// import { useControlledDatePicker } from "../../hookForm/useControlledDatePicker";

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
  const [open, setOpen] = useState(false);
  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const { data } = useTags();

  const options: OptionType[] = data?.data ?? [];
  const tagsValue = useWatch({ control, name: "tags" });

  const useControlledDatePicker = (control, name, defaultValue = "") => {
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue,
    });

    const handleDatePickerChange = (date) => {
      if (date) {
        setStartDate(date);
        field.onChange(date.toISOString());
      } else {
        setStartDate(null);
        field.onChange("");
      }
    };

    return { field, error, startDate, handleDatePickerChange };
  };

  const { field: nameField, error: nameError } = useControlledInput(
    control,
    "name"
  );
  const { field: contentField, error: contentError } = useControlledInput(
    control,
    "content"
  );
  const {
    field: tagsField,
    error: tagsError,
    handleAutocompleteChange,
  } = useControlledAutocomplete(control, "tags");
  const {
    field: deadlineField,
    error: deadlineError,
    // startDate,
    handleDatePickerChange,
  } = useControlledDatePicker(control, "deadline");

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
            {...nameField}
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
            {...contentField}
            id="content"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="task 1"
          />
          {contentError && (
            <p className="text-red-500 text-xs italic">
              {contentError.message ?? ""}
            </p>
          )}
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700">
            Tags:
            <Autocomplete
              multiple
              options={options}
              disableCloseOnSelect={true}
              getOptionLabel={(option: OptionType) => option?.title}
              onChange={handleAutocompleteChange}
              value={tagsField.value || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  className="mt-1"
                />
              )}
            />
          </label>
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700">
            Date:
            <DatePicker
              selected={startDate}
              onChange={handleDatePickerChange}
              timeInputLabel="Time:"
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeInput
            />
          </label>
          {deadlineError && (
            <p className="text-red-500 text-xs italic">
              {deadlineError.message ?? ""}
            </p>
          )}
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
