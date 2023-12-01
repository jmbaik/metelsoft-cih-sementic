import React from 'react';
import { useController } from 'react-hook-form';
import Select from 'react-select';

export default function MAutocomplete({
  control,
  data,
  name,
  val,
  labelFunc,
  placeHolder,
}) {
  const {
    field: { value, onChange },
  } = useController({ name: name, control });

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 34,
      minHeight: 34,
    }),
  };
  return (
    <Select
      isClearable
      options={data}
      value={value ? data.find((x) => x[val] === value) : value}
      onChange={(option) => onChange(option ? option[val] : option)}
      getOptionLabel={labelFunc}
      getOptionValue={(x) => x[val]}
      styles={customStyles}
      placeholder="목사님 선택"
      {...(placeHolder ? { placeholder: placeHolder } : {})}
    />
  );
}
