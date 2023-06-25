import { useController } from "react-hook-form";

export const useControlledInput = (control, name, defaultValue = "") => {
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      defaultValue,
    });

    return { field, error };
  };