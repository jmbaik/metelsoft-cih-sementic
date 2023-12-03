import React from 'react';
import { useRecoilValue } from 'recoil';
import { Button, Form, Icon, Image, Segment } from 'semantic-ui-react';
import { useFetchPastor } from '../../api/commonCodeApi';
import { adminUserState } from '../../atoms/adminUserState';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSaveYoutubeDataByChannel } from './MetelYoutubeApi';
import MSelect from '../../components/MSelect';
import MAutocomplete from '../../components/MAutocomplete';
import Loading from '../../components/Loading';
import MAgGrid from '../../components/MAgGrid';

export default function SearchAutoRegister(props) {
  const [resultData, setResultData] = useState([]);

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

  const { mutateSaveYoutubeDataByChannel, isLoadingYoutubeDataByChannel } =
    useSaveYoutubeDataByChannel();

  const onSubmit = async (data) => {
    const _category = getValues('category');
    const _pastorCode = getValues('pastorCode');
    if (_category === 'pastor') {
      if (_pastorCode.length === 0) {
        alert('목사님을 선택하여 주세요');
        return;
      }
    }
    const reqData = {
      ...data,
      userId: user.uid,
    };
    mutateSaveYoutubeDataByChannel(reqData, {
      onSuccess: (data) => {
        setResultData(data);
        alert('저장작업을 성공하였습니다.');
      },
    });
  };
  const toList = (read) => {
    props.upperFn(read);
  };
  const onSelection = (rows) => {
    console.log('rows', rows);
  };
  return (
    <Segment>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={{ width: '1024px' }}
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
                toList('r');
              }}
            />
          </Form.Field>

          <Form.Input
            name="channelId"
            placeholder="Channel Id"
            readOnly
            style={{ width: 300 }}
            {...register('channelId', { required: 'channelId 필수 항목' })}
            error={!!errors?.channelId}
          />
          <Form.Field style={{ width: 200 }}>
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
        </Form.Group>
        <Form.Group>
          <Form.Input
            style={{ width: 200 }}
            type="text"
            name="prevPageToken"
            size="small"
            placeholder="prevPageToken"
            readOnly
            {...register('prevPageToken')}
          />
          <Form.Input
            style={{ width: 200 }}
            type="text"
            name="nextPageToken"
            size="small"
            placeholder="nextPageToken"
            readOnly
            {...register('nextPageToken')}
          />
          <Form.Input
            style={{ width: 300 }}
            type="text"
            name="q"
            size="small"
            icon="search"
            iconPosition="left"
            placeholder="찾기 키워드를 반드시 입력하여 주세요"
            {...register('q', { required: 'q 필수 항목' })}
            error={!!errors?.q}
          />
          <Form.Field>
            <Button
              size="small"
              icon="right arrow"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </Form.Field>
          <Form.Field style={{ width: '50px' }}>
            <Button type="submit" primary icon>
              <Icon name="cloud download" />
            </Button>
          </Form.Field>
          <Form.Field>
            <Button
              size="small"
              color="red"
              icon="delete"
              content="삭제"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      {isLoadingYoutubeDataByChannel && (
        <Loading active={isLoadingYoutubeDataByChannel} />
      )}
      <Segment>
        <MAgGrid
          columns={columns}
          rows={resultData}
          width={'100%'}
          height={'72vh'}
          rowHeight={70}
          onDoubleClicked={() => {}}
          isAutoSizeColumn={false}
          onSelection={onSelection}
        />
      </Segment>
    </Segment>
  );
}

const columns = [
  {
    field: 'check',
    width: 30,
    headerCheckboxSelection: true,
    checkboxSelection: true,
  },
  {
    field: 'thumbnailDefault',
    headerName: 'Thumbnail',
    width: 130,
    cellRenderer: function (params) {
      return (
        <Image
          src={params.value}
          size="small"
          as="a"
          href={params.value}
          target="_blank"
          rounded
        />
      );
    },
  },
  {
    field: 'vid',
    headerName: 'VID',
    width: 150,
    cellRenderer: function (params) {
      const _url = `https://youtube.com/watch?v=${params.value}`;
      return (
        <a href={_url} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      );
    },
  },
  {
    field: 'pastorCode',
    headerName: '목사코드',
    width: 100,
  },
  {
    field: 'pastorName',
    headerName: '목사',
    width: 100,
    sortable: true,
  },
  {
    field: 'title',
    headerName: '제목',
    sortable: true,
    width: 600,
  },
  {
    field: 'channelId',
    headerName: '출처 바로가기',
    cellRenderer: function (params) {
      const _url = `https://youtube.com/channel/${params.value}`;
      return (
        <a href={_url} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
      );
    },
  },
  {
    field: 'channelTitle',
    headerName: '출처',
    width: 120,
    sortable: true,
  },
  {
    field: 'createYmd',
    headerName: '생성일',
    width: 100,
    sortable: true,
  },

  {
    field: 'publishedAt',
    headerName: 'publishedAt',
    width: 200,
    sortable: true,
  },

  {
    field: 'userId',
    headerName: '생성자',
    sortable: true,
    width: 80,
  },
  {
    field: 'updDt',
    headerName: '최종수정일',
    width: 180,
    sortable: true,
  },
  {
    field: 'grade',
    headerName: 'G',
    sortable: true,
    width: 80,
  },
  {
    field: 'sort',
    headerName: 'S',
    sortable: true,
    width: 80,
  },
];
