import { useRecoilValue } from 'recoil';
import { adminUserState } from '../../atoms/adminUserState';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetchYoutubeSearchByVid } from '../../api/youtubeDataApi';
import {
  useDeleteYoutubeSermon,
  useSaveYoutubeSermon,
} from '../../api/youtubeSermonApi';
import { Button, Divider, Form, Icon, Segment } from 'semantic-ui-react';
import MSelect from '../../components/MSelect';

export default function YoutubeSermonRegister(props) {
  const user = useRecoilValue(adminUserState);

  const [formData, setFormData] = useState({
    youtubeId: '',
    channelId: '',
    grade: props.crud === 'e' ? props.params.grade : '',
  });

  const toList = (read) => {
    props.upperFn(read);
  };

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
      youtubeId: '',
      vid: '',
      channelId: '',
      title: '',
      channelTitle: '',
      thumbnailDefault: '',
      thumbnailMedium: '',
      thumbnailHigh: '',
      grade: 'D',
      sort: 50,
      createYmd: '',
      publishedAt: '',
      description: '',
      userId: '',
      updDt: '',
      mainYn: 'N',
    },
  });
  const { errors } = formState;

  const {
    data: youtubeSearchData,
    error: searchError,
    isError: isSearchError,
  } = useFetchYoutubeSearchByVid(formData.youtubeId);

  const search = () => {
    const _youtubeId = getValues('youtubeId');

    if (_youtubeId?.length > 0) {
      setFormData({ ...formData, youtubeId: _youtubeId });
    }
    if (isSearchError) {
      console.log('search error', searchError.message);
    }
  };

  const { mutateSaveYoutubeSermon } = useSaveYoutubeSermon();
  const { mutateDeleteYoutubeSermon } = useDeleteYoutubeSermon();

  const onSubmit = (data) => {
    const reqData = {
      ...data,
      userId: user.uid,
    };
    mutateSaveYoutubeSermon(reqData, {
      onSuccess: () => {
        alert('저장작업을 성공하였습니다.');
        reset();
        setFormData({
          youtubeId: '',
          channelId: '',
          pastorCode: '',
          grade: '',
          sort: '',
        });
        if (props.crud === 'e') {
          toList('r');
        }
      },
    });
  };

  const onDelete = () => {
    let cfm = window.confirm(
      '삭제를 하시면 해당 데이터가 보이지 않습니다. \n\n 삭제 작업을 진행하시겠습니까?'
    );
    if (cfm) {
      const _getvalues = getValues();
      const reqData = { ..._getvalues, userId: user.uid };
      mutateDeleteYoutubeSermon(reqData, {
        onSuccess: () => {
          alert('삭제작업을 성공하였습니다.');
          reset();
          setFormData({
            youtubeId: '',
            channelId: '',
            grade: '',
            sort: '',
          });
          if (props.crud === 'e') {
            toList('r');
          }
        },
      });
    }
  };

  useEffect(() => {
    /***
     * id : youtubeId
     * snippet.channelId
     * snippet.channelTitle
     * snippet.title
     * snippet.description
     * snippet.thumbnails.default.url
     * snippet.thumbnails.medium.url
     * snippet.thumbnails.high.url
     * 
     * vid: '',
      pastorCode: '',
      channelId: '',
      title: '',
      channelTitle: '',
      thumbnailDefault: '',
      thumbnailMedium: '',
      thumbnailHigh: '',
      grade: '',
      sort: '',
      createYmd: '',
      description: '',
      userId: 'admin',
      updDt: '',
     */
    if (youtubeSearchData?.length > 0) {
      const data = youtubeSearchData[0];
      setValue('vid', data.id);
      setValue('channelId', data.snippet.channelId);
      setValue('title', data.snippet.title);
      setValue('channelTitle', data.snippet.channelTitle);
      setValue('thumbnailDefault', data.snippet.thumbnails.default.url);
      setValue('thumbnailMedium', data.snippet.thumbnails.medium.url);
      setValue('thumbnailHigh', data.snippet.thumbnails.high.url);
      setValue('publishedAt', data.snippet.publishedAt);
      setValue('description', data.snippet.description);
    }
  }, [youtubeSearchData, setValue]);

  const editDataSetValues = useCallback(() => {
    if (props.crud === 'e') {
      const _values = props.params;
      for (const [key, value] of Object.entries(_values)) {
        setValue(key, value);
      }
      setValue('youtubeId', getValues('vid'));
    }
  }, [props.crud, props.params, setValue, getValues]);

  useEffect(() => {
    editDataSetValues();
  }, [editDataSetValues]);

  // useEffect(() => {
  //   if (props.crud === 'e') {
  //     setFormData({ ...formData, pastorCode: props?.params.pastorCode });
  //   }
  // }, [formData, props.crud, props?.params.pastorCode]);

  return (
    <>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={{ width: '900px' }}
      >
        <Segment>
          <Form.Group widths={'equal'}>
            <Form.Field>
              <MSelect
                control={control}
                data={[
                  { key: '', value: '', text: '-선택' },
                  { key: 'A', value: 'A', text: '제휴' },
                  { key: 'B', value: 'B', text: '최우선' },
                  { key: 'C', value: 'C', text: '높음' },
                  { key: 'D', value: 'D', text: '중간' },
                  { key: 'E', value: 'E', text: '낮음' },
                ]}
                name="grade"
                required={true}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                type="number"
                label="자체 평점"
                name="sort"
                size="small"
                placeholder="자체 평점"
                {...register('sort', { required: 'sort 필수 항목' })}
                error={!!errors?.sort}
              />
            </Form.Field>
          </Form.Group>
          <Divider />
          <Form.Group widths={'equal'}>
            <Form.Field error={!!errors.name}>
              <Form.Input
                type="text"
                name="youtubeId"
                size="small"
                placeholder="영상 VID를 입력하여 주세요"
                {...register('youtubeId', { required: 'youtubeId 필수 항목' })}
                error={!!errors?.youtubeId}
                disabled={props?.crud === 'e' ? true : false}
              />
            </Form.Field>
            <Form.Field>
              <Button
                icon
                onClick={(e) => {
                  e.preventDefault();
                  search();
                }}
              >
                <Icon name="search" />
              </Button>
            </Form.Field>
            <Form.Field>
              <MSelect
                control={control}
                data={[
                  { key: 'N', value: 'N', text: 'Main 영상 아님' },
                  { key: 'Y', value: 'Y', text: 'Main 영상' },
                ]}
                name="mainYn"
                isLabel={false}
                required={true}
              />
            </Form.Field>
            <Form.Field>
              <Button
                primary
                floated="right"
                content="저장"
                size="small"
                type="submit"
                icon="save"
                labelPosition="left"
              />
              {props.crud === 'e' && (
                <Button
                  floated="right"
                  color="red"
                  content="삭제"
                  size="small"
                  icon="delete"
                  labelPosition="left"
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete();
                  }}
                />
              )}
            </Form.Field>
          </Form.Group>
        </Segment>
        <Segment>
          <Form.Group widths={'equal'}>
            <Form.Input
              label="VID"
              name="vid"
              placeholder="VID"
              readOnly
              {...register('vid', { required: 'vid 필수 항목' })}
              error={!!errors?.vid}
            />
            <Form.Input
              label="Channel Id"
              name="channelId"
              placeholder="Channel Id"
              readOnly
              {...register('channelId', { required: 'channelId 필수 항목' })}
              error={!!errors?.channelId}
            />
          </Form.Group>
          <Form.Input
            fluid
            label="Channel Title"
            name="channelTitle"
            placeholder="Channel Title"
            readOnly
            {...register('channelTitle', {
              required: 'channelTitle 필수 항목',
            })}
            error={!!errors?.channelTitle}
          />
          <Form.Input
            fluid
            label="Title"
            name="title"
            placeholder="Title"
            readOnly
            {...register('title', {
              required: 'title 필수 항목',
            })}
            error={!!errors?.title}
          />
          <Form.Input
            fluid
            label="Thumbnail Default"
            name="thumbnailDefault"
            placeholder="Thumbnail Default"
            readOnly
            {...register('thumbnailDefault', {
              required: 'thumbnailDefault 필수 항목',
            })}
            error={!!errors?.thumbnailDefault}
          />
          <Form.Input
            fluid
            label="Thumbnail Medium"
            name="thumbnailMedium"
            placeholder="Thumbnail Medium"
            readOnly
            {...register('thumbnailMedium', {
              required: 'thumbnailMedium 필수 항목',
            })}
            error={!!errors?.thumbnailMedium}
          />
          <Form.Input
            fluid
            label="Thumbnail High"
            name="thumbnailHigh"
            placeholder="Channel High"
            readOnly
            {...register('thumbnailHigh', {
              required: 'thumbnailHigh 필수 항목',
            })}
            error={!!errors?.thumbnailHigh}
          />
          <Form.Input
            fluid
            label="publishedAt"
            name="publishedAt"
            placeholder="publishedAt"
            readOnly
            {...register('publishedAt', {
              required: 'publishedAt 필수 항목',
            })}
            error={!!errors?.publishedAt}
          />
          <Form.TextArea
            label="Description"
            name="description"
            placeholder="Description"
            readOnly
            {...register('description')}
          />
        </Segment>
      </Form>
    </>
  );
}
