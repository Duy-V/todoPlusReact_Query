import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { BasicTagSchema, TagWithId } from "../../models/todoList";
import { zodResolver } from "@hookform/resolvers/zod";
import useAddTag from "../../hooks/tagHook/useAddTag";
import useUpdateTag from "../../hooks/tagHook/useUpdateTag";
import useTags from "../../hooks/tagHook/useTags";

interface TagFormProps {
  isEditing: boolean;
  existingTag: any;
}

const TagForm: React.FC<TagFormProps> = ({ isEditing, existingTag }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<TagWithId>({
    resolver: zodResolver(BasicTagSchema),
  });
  const tagsColor = useWatch({ control, name: "color" });

  const addTag = useAddTag();
  const updateTag = useUpdateTag();
  const options: string[] = [
    "pink",
    "green",
    "yellow",
    "orange",
    "violet",
    "coral",
    "magenta",
    "azure",
    "crimson",
    "silver",
    "fuchsia",
    "maroon",
    "blue",
    "brown",
    "purple",
    "red",
  ];
  const exitingList = useTags();
  const onSubmit: SubmitHandler<any> = (data) => {
    exitingList.data.data?.find((item: any) => item.title === data.title)
      ? alert("the name is existing")
      : existingTag
      ? updateTag.mutate({ ...existingTag, ...data })
      : addTag.mutate(data);
  };
  useEffect(() => {
    console.log(existingTag);
    if (existingTag) {
      setValue("title", existingTag.title);
      setValue("color", existingTag.color);
    }
  }, [existingTag]);
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
            {...register("title")}
            placeholder="Bill"
            id="title"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.title?.message && (
            <p className="text-red-500 text-xs italic">
              {errors.title?.message ?? ""}
            </p>
          )}
        </div>

        <div>
          <label className="text-lg font-medium text-gray-700">
            Color:
            <Controller
              name="color"
              control={control}
              defaultValue={existingTag?.color}
              render={({ field }) => (
                <Autocomplete
                  options={options}
                  {...register("color")}
                  getOptionLabel={(option) => option}
                  value={tagsColor || ""}
                  onChange={(_, data) => field.onChange(data)}
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
            {errors.color?.message && (
              <p className="text-red-500 text-xs italic">
                {errors.color?.message ?? ""}
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

export default TagForm;
