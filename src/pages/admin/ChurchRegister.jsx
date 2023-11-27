import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Form,
  Input,
  Label,
  LabelDetail,
  Segment,
  TextArea,
} from 'semantic-ui-react';
import { useFetchAreaCode } from '../../api/commonCodeApi';
import Select from 'react-select';
import { render } from '@testing-library/react';

export default function ChurchRegister() {
  const { register, handleSubmit, setValue, formState, ref, control } = useForm(
    {
      mode: 'onSubmit',
      defaultValues: {
        areaCode: '',
        churchCode: '',
        name: '',
        comment: '',
      },
    }
  );
  const { errors } = formState;
  const { data: areaData } = useFetchAreaCode();

  // console.log(areaData);
  return (
    <Segment>
      <Form>
        <Form.Field>
          <Select inputId="areaCode" size="small" options={areaData ?? []} />
        </Form.Field>
        <Form.Field>
          <Controller
            control={control}
            name="areaCode"
            render={({ field: { onChange, value, ref } }) => {
              <Select
                inputId="areaCode"
                options={areaData ?? []}
                ref={ref}
                value={areaData?.find((option) => option.areaCode === value)}
                onChange={(option) => onChange(option.areaCode)}
              />;
            }}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Field error={!!errors.password}>
            <label>Password</label>
            <Input
              fluid
              type="password"
              name="password"
              icon="lock"
              size="small"
              iconPosition="left"
              placeholder="Password"
              {...register('password', {
                required: true,
              })}
            />
          </Form.Field>
          <Form.Field
            id="form-input-control-first-name"
            control={Input}
            label="First name"
            placeholder="First name"
          />
          <Form.Field
            id="form-input-control-last-name"
            control={Input}
            label="Last name"
            placeholder="Last name"
          />
          {/* <Form.Field
            control={Select}
            options={genderOptions}
            label={{
              children: 'Gender',
              htmlFor: 'form-select-control-gender',
            }}
            placeholder="Gender"
            search
            searchInput={{ id: 'form-select-control-gender' }}
          /> */}
        </Form.Group>
        <Form.Field
          id="form-textarea-control-opinion"
          control={TextArea}
          label="Opinion"
          placeholder="Opinion"
        />
        {/* <Form.Field error={!!errors.password}>
              <Input
                fluid
                type="password"
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                {...register('password', {
                  required: true,
                })}
              />
            </Form.Field> */}
        <Form.Field
          id="form-input-control-error-email"
          control={Input}
          label="Email"
          placeholder="joe@schmoe.com"
          error={{
            content: 'Please enter a valid email address',
            pointing: 'below',
          }}
        />
        <Form.Field
          id="form-button-control-public"
          control={Button}
          content="Confirm"
          label="Label with htmlFor"
        />
      </Form>
    </Segment>
  );
}
