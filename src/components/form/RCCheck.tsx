import { Checkbox, SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TCheckProps = {
  name: string;
  size?: "small" | "medium" | "large";
  sx?: SxProps;
  defaultChecked?: boolean;
};

const RCCheck = ({ name, size, sx, defaultChecked }: TCheckProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          {...field}
          sx={{ ...sx }}
          size={size || "small"}
          defaultChecked={defaultChecked}
          checked={!!field.value}
        />
      )}
    />
  );
};

export default RCCheck;
