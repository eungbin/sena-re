type ZzolSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type ZzolSelectProps = {
  name: string;
  label: string;
  options: ZzolSelectOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  id?: string;
  helperText?: string;
  disabled?: boolean;
};

import { Select } from "../../../_components/_ui/Select";

export function ZzolSelect({
  name,
  label,
  options,
  defaultValue,
  value,
  onValueChange,
  id,
  helperText,
  disabled,
}: ZzolSelectProps) {
  return (
    <Select
      id={id}
      name={name}
      label={label}
      helperText={helperText}
      disabled={disabled}
      options={options}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      triggerClassName="mt-2"
    />
  );
}


