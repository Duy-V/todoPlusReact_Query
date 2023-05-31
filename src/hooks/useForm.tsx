// useForm.ts
import { useState, ChangeEvent } from "react";
import { Todo } from "../store";

const useForm = (initialState: Todo) => {
  const [values, setValues] = useState<Todo>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setValues(initialState);
  };

  return { values, handleChange, resetForm };
};

export default useForm;
