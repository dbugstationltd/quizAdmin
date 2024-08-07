import React, { useEffect, useState } from 'react';
import { MenuItem, SxProps, TextField } from '@mui/material';

type TItem = {
  label: string;
  value: string | number;
};

type TSelectProps = {
  items: TItem[];
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  size?: 'small' | 'medium';
  sx?: SxProps;
  value: string;
  onValueChange: (value: string) => void;
};

const RCSelectWithWatchExtra: React.FC<TSelectProps> = ({
  items,
  name,
  label,
  placeholder,
  required = false,
  size = 'small',
  sx = {},
  value,
  onValueChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onValueChange(newValue);
  };

  return (
    <TextField
      name={name}
      value={selectedValue}
      onChange={handleChange}
      sx={{
        ...sx,
        '& .MuiInputBase-input': { fontSize: '14px', py: '7px' },
      }}
      InputLabelProps={{ style: { fontSize: '14px' } }}
      select
      size={size}
      label={label}
      placeholder={placeholder}
      required={required}
      fullWidth
    >
      {items.map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default RCSelectWithWatchExtra;
