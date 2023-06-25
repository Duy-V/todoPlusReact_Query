import { useState } from "react";
import { useController } from "react-hook-form";

export const useControlledDatePicker = (control, name, defaultValue = "") => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const [startDate, setStartDate] = useState(null);

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
