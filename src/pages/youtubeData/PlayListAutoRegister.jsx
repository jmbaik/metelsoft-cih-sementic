import React, { useState } from 'react';
import { Button, Form, Icon, Segment } from 'semantic-ui-react';
import MAutocomplete from '../../components/MAutocomplete';
import { useRecoilValue } from 'recoil';
import { adminUserState } from '../../atoms/adminUserState';
import { useForm } from 'react-hook-form';
import { useFetchPastor } from '../../api/commonCodeApi';
import MSelect from '../../components/MSelect';

export default function PlayListAutoRegister(props) {
  const user = useRecoilValue(adminUserState);
  const { data: pastorData } = useFetchPastor(props.crud);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState,
    reset,
    control,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      category: '',
      pastorCode: '',
      channelId: props.params.channelId,
    },
  });
  const { errors } = formState;
  const onSubmit = (data) => {
    const _category = getValues('category');
    const _pastorCode = getValues('pastorCode');
    if (_category === 'pastor') {
      if (_pastorCode.length === 0) {
        alert('목사님을 선택하여 주세요');
        return;
      }
    }
    alert('submit');
  };

  return (
    <Segment>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={{ width: '900px' }}
      >
        <Form.Group>
          <Form.Field>
            <Button
              floated="right"
              content="목록"
              size="small"
              type="submit"
              icon="left arrow"
              labelPosition="left"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </Form.Field>

          <Form.Input
            name="channelId"
            placeholder="Channel Id"
            readOnly
            {...register('channelId', { required: 'channelId 필수 항목' })}
            error={!!errors?.channelId}
          />
          <Form.Field>
            <MSelect
              isLabel={false}
              control={control}
              data={[
                { key: '', value: '', text: '-선택' },
                { key: 'pastor', value: 'pastor', text: '목사님영상' },
                { key: 'celeb', value: 'celeb', text: '유명인간증영상' },
                { key: 'sermon', value: 'sermon', text: '강해설교영상' },
                { key: 'mercy', value: 'mercy', text: '긍휼사역영상' },
                { key: 'ccm', value: 'ccm', text: '나의성장 CCM' },
              ]}
              name="category"
              required={true}
            />
          </Form.Field>
          <Form.Field style={{ width: '300px' }}>
            <MAutocomplete
              control={control}
              data={pastorData || []}
              val="pastorCode"
              name="pastorCode"
              placeHolder="목사님 선택"
              labelFunc={(x) => x.name + ' [' + x.churchName + ']'}
            />
          </Form.Field>
          <Form.Field style={{ width: '50px' }}>
            <Button type="submit" icon>
              <Icon name="cloud download" />
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </Segment>
  );
}
