import React from 'react';
import { useController } from 'react-hook-form';
import { Checkbox } from 'semantic-ui-react';

export default function MCheckbox({ control, name, label, required }) {
  // { key: '', value: '', text: '-선택' },
  const {
    field: { value, onChange },
  } = useController({ name: name, control, rules: { required: required } });

  // console.log('formstate.errors', formState.errors[name]);
  return (
    <>
      <Checkbox
        label={label}
        name={name}
        size="small"
        onChange={(e, v) => {
          onChange(v ? v.checked : v);
        }}
        checked={value}
      />
    </>
  );
}
