import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form, Input, Segment, TextArea } from 'semantic-ui-react';
import { useFetchAreaCode, useSaveChurchCode } from '../../api/commonCodeApi';
import MAutocomplete from '../../components/MAutocomplete';

export default function ChurchRegister(props) {
  const { register, handleSubmit, setValue, formState, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      areaCode: '',
      churchCode: '',
      name: '',
      comment: '',
    },
  });
  const { errors } = formState;

  const { data: areaData, refetch: refetchAreaData } = useFetchAreaCode();
  const { mutateSaveChurch, saveChurchLoading } = useSaveChurchCode();

  const toList = (read) => {
    props.upperFn(read);
  };

  const onSubmit = (data) => {
    const reqData = { ...data, userId: 'admin' };
    if (data?.areaCode === '') {
      alert('AreaCode is not filled');
      return;
    }
    console.log(reqData);
    mutateSaveChurch(reqData, {
      onSuccess: () => {
        toList('r');
      },
    });
  };

  useEffect(() => {
    if (props.crud === 'e') {
      const _values = props.params;
      for (const [key, value] of Object.entries(_values)) {
        setValue(key, value);
      }
    }
  }, [props.crud, props.params, setValue]);

  useEffect(() => {
    if (props.crud === 'e') {
      refetchAreaData();
    }
  }, [props.crud, refetchAreaData]);

  if (saveChurchLoading) return <h3>save process Loading...</h3>;
  return (
    <Segment>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group widths="equal">
          <Form.Field>
            <label>지역 코드</label>
            <MAutocomplete
              control={control}
              data={areaData || []}
              val="aliasCode"
              name="areaCode"
              labelFunc={(x) => x.name}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ color: '#ccc' }}>교회 코드</label>
            <Input
              fluid
              type="text"
              name="churchCode"
              size="small"
              disabled
              placeholder="ChurchCode"
              {...register('churchCode')}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field error={!!errors.name}>
          <label>교회명</label>
          <Input
            fluid
            type="text"
            name="name"
            size="small"
            placeholder="Name"
            {...register('name', {
              required: true,
            })}
          />
        </Form.Field>
        <Form.Field>
          <label>설명</label>
          <TextArea
            placeholder="Comment"
            name="comment"
            size="small"
            {...register('comment')}
          />
        </Form.Field>
        <Form.Field>
          <Button primary size="small" type="submit">
            저장
          </Button>
        </Form.Field>
      </Form>
    </Segment>
  );
}
