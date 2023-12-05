import React from 'react';
import { useState } from 'react';
import { Button, Form, Icon, Image, Segment } from 'semantic-ui-react';
import { adminUserState } from '../../atoms/adminUserState';
import { useRecoilValue } from 'recoil';
import { useFetchPastor } from '../../api/commonCodeApi';
import { useForm } from 'react-hook-form';
import {
  useSaveVideosByPlaylistId,
  useSaveVideosBySearchApi,
} from './MetelYoutubeApi';
import MSelect from '../../components/MSelect';
import MAutocomplete from '../../components/MAutocomplete';
import Loading from '../../components/Loading';
import MAgGrid from '../../components/MAgGrid';

export default function AutoRegisterPlayListItems(props) {
  const [resultData, setResultData] = useState([]);

  const user = useRecoilValue(adminUserState);
  const { data: pastorData } = useFetchPastor(props.crud);
  const { register, handleSubmit, setValue, formState, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      category: '',
      pastorCode: '',
      channelId: props.params.channelId,
      prevPageToken: '',
      nextPageToken: '',
      playlistId: '',
    },
  });
  const { errors } = formState;

  const { mutateSaveVideosByPlaylistId, isLoadingSaveVideosByPlaylistId } =
    useSaveVideosByPlaylistId();

  const onSubmit = async (data) => {
    const _category = data.category;
    const _pastorCode = data.pastorCode;
    if (_category === 'pastor') {
      if (_pastorCode.length === 0) {
        alert('목사님을 선택하여 주세요');
        return;
      }
    }
    const reqData = {
      ...data,
      prevPageToken: '',
      userId: user.uid,
    };
    console.log('submit req data', reqData);
    mutateSaveVideosByPlaylistId(reqData, {
      onSuccess: (data) => {
        const result = data.result;
        if (result === 'error') {
          alert(data.message);
          return;
        }
        setValue('prevPageToken', data.prevPageToken);
        setValue('nextPageToken', data.nextPageToken);
        const videos = data.videos;
        setResultData(videos);
        alert('저장작업을 성공하였습니다.');
      },
    });
  };
  const toList = (read) => {
    props.upperFn(read);
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
            style={{ width: 250 }}
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
            style={{ width: 150 }}
            type="text"
            name="prevPageToken"
            size="small"
            placeholder="prevPageToken"
            readOnly
            {...register('prevPageToken')}
          />
          <Form.Input
            style={{ width: 150 }}
            type="text"
            name="nextPageToken"
            size="small"
            placeholder="nextPageToken"
            readOnly
            {...register('nextPageToken')}
          />
          <Form.Input
            style={{ width: 380 }}
            type="text"
            name="playlistId"
            size="small"
            icon="list alternate outline"
            iconPosition="left"
            placeholder="플레이리스트 아이디를 입려하여 주세요"
            {...register('playlistId')}
            error={!!errors?.playlistId}
          />
          <Form.Field style={{ width: '50px' }}>
            <Button type="submit" icon size="small">
              <Icon name="cloud download" />
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
      {isLoadingSaveVideosByPlaylistId && (
        <Loading active={isLoadingSaveVideosByPlaylistId} />
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
        />
      </Segment>
    </Segment>
  );
}

const columns = [
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
    width: 180,
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
