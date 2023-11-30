import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchChurchCode, useSavePastor } from '../../api/commonCodeApi';
import { Button, Form, Input, Segment, TextArea } from 'semantic-ui-react';
import MAutocomplete from '../../components/MAutocomplete';
import MSelect from '../../components/MSelect';

export default function PastorRegister(props) {
  const { register, handleSubmit, setValue, formState, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      pastorCode: '',
      churchCode: '',
      grade: '',
      name: '',
      comment: '',
      pic: '',
    },
  });
  const { errors } = formState;

  const toList = (read) => {
    props.upperFn(read);
  };

  const { data: churchData, refetch: refetchChurchData } = useFetchChurchCode();
  const { mutateSavePastor, savePastorLoading } = useSavePastor();

  const onSubmit = (data) => {
    const reqData = { ...data, userId: 'admin' };
    if (data?.churchCode === '') {
      alert('ChurchCode is not filled');
      return;
    }
    console.log(reqData);
    mutateSavePastor(reqData, {
      onSuccess: () => {
        toList('r');
      },
    });
  };

  const gradeList = [
    { key: '', value: '', text: '-선택' },
    { key: 'P', value: 'P', text: '목사' },
    { key: 'M', value: 'M', text: '선교사' },
    { key: 'E', value: 'E', text: '장로' },
  ];

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
      refetchChurchData();
    }
  }, [props.crud, refetchChurchData]);

  if (savePastorLoading) return <h3>save process Loading...</h3>;
  return (
    <Segment>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group widths="equal">
          <Form.Field>
            <label>교회 선택</label>
            <MAutocomplete
              control={control}
              data={churchData || []}
              val="churchCode"
              name="churchCode"
              labelFunc={(x) => x.name}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ color: '#aaa' }}>목사님 코드</label>
            <Input
              fluid
              type="text"
              name="pastorCode"
              size="small"
              style={{ color: 'black' }}
              disabled
              placeholder="pastorCode"
              {...register('pastorCode')}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field error={!!errors.grade}>
          <MSelect
            control={control}
            data={gradeList}
            name="grade"
            required={true}
          />
        </Form.Field>
        <Form.Field error={!!errors.name}>
          <label>목사님 이름</label>
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
