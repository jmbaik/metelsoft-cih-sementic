import React from 'react';
import { useController } from 'react-hook-form';
import { Dropdown } from 'semantic-ui-react';

export default function MSelect({ control, data, name, required }) {
  // { key: '', value: '', text: '-선택' },
  const {
    field: { value, onChange },
    formState,
  } = useController({ name: name, control, rules: { required: required } });

  // console.log('formstate.errors', formState.errors[name]);
  return (
    <>
      <label>{name}</label>
      <Dropdown
        fluid
        options={data}
        name={name}
        size="small"
        selection
        placeholder={name}
        onChange={(e, v) => {
          onChange(v ? v.value : v);
        }}
        value={value}
        error={!!formState.errors[name]}
      />
    </>
  );
}
