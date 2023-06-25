import { useController } from "react-hook-form";
import { useControlledInput } from "./useControlledInput";

export const useControlledAutocomplete = (control, name, defaultValue = []) => {
  const { field, error } = useControlledInput(control, name, defaultValue);

  const handleAutocompleteChange = (_, data) => {
    const lastSelectedItem = data[data.length - 1];
    const isAlreadySelected = field?.value?.some(
      (item) => item.title === lastSelectedItem.title
    );
    const newValue = isAlreadySelected
      ? field.value.filter((item) => item.title !== lastSelectedItem.title)
      : data;
    field.onChange(newValue);
  };

  return { field, error, handleAutocompleteChange };
};
