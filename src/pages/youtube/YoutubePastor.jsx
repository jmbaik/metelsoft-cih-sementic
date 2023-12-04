import React from 'react';
import {
  Container,
  Form,
  Header,
  Image,
  Input,
  Segment,
} from 'semantic-ui-react';
import MBreadcrumb from '../../components/MBreadcrumb';
import { useState } from 'react';
import { useEffect } from 'react';
import { useFetchYoutubePastor } from '../../api/youtubeVideo';
import MAgGrid from '../../components/MAgGrid';
import YoutubePastorRegister from './YoutubePastorRegister';
import { useDeleteVideos } from '../../api/youtubeDataApi';

export default function YoutubePastor({ cr }) {
  const [crud, setCrud] = useState('r');
  const [editParams, setEditParams] = useState({});

  const fnSub = (read) => {
    if (read === 'r') setEditParams({});
    setCrud(read);
  };

  useEffect(() => {
    if (cr === 'r') {
      setCrud('r');
    }
  }, [cr]);

  function doubleClicked(param) {
    setEditParams(param);
    setCrud('e');
  }
  /* search */
  const [options, setOptions] = useState('time');
  const [keyword, setKeyword] = useState('');

  const [searchParams, setSearchParams] = useState({
    options: 'time',
    keyword: '',
  });

  const searchHandleChange = (e, { value }) => {
    setOptions(value);
    setSearchParams({ ...searchParams, options: options, keyword: '' });
  };
  const searchKeywordChange = (e, { value }) => {
    setKeyword(value);
  };

  const search = () => {
    if (options !== 'time' && keyword === '') {
      alert('Keyword 입력하여 주세요');
      return;
    }
    setSearchParams({ options: options, keyword: keyword });
  };

  const { isLoading, data, isError, error, refetch } =
    useFetchYoutubePastor(searchParams);

  const [deleteRows, setDeleteRows] = useState([]);
  const onSelection = (rows) => {
    setDeleteRows(rows);
  };

  const { mutateDeleteVideos } = useDeleteVideos();
  const deleteVideos = () => {
    if (deleteRows.length === 0) {
      alert('삭제할 영상이 없습니다.');
      return;
    }
    const req = {
      category: 'pastor',
      videos: deleteRows,
    };
    mutateDeleteVideos(req, {
      onSuccess: (result) => {
        alert('삭제작업을 완료하였습니다.');
        refetch();
      },
    });
  };

  if (isLoading) return <h3>Loading...</h3>;
  // if (isLoadingDeleteVideos) return <h3>Loading...</h3>;
  if (isError) return <h3>{error.message}</h3>;
  return (
    <Container fluid>
      <MBreadcrumb first={'Home'} second={'Youtube'} third={'Pastor'} />
      <Header as="h2" dividing>
        Youtube 목사님 영상 등록
      </Header>
      <Form>
        <Form.Group inline>
          {crud === 'r' && (
            <>
              <Form.Radio
                size="small"
                label="Recent 50th"
                value="time"
                checked={options === 'time'}
                onChange={searchHandleChange}
              />
              <Form.Radio
                size="mini"
                label="Name"
                value="name"
                checked={options === 'name'}
                onChange={searchHandleChange}
              />
              <Form.Radio
                size="mini"
                label="Title"
                value="title"
                checked={options === 'title'}
                onChange={searchHandleChange}
              />
              <Form.Radio
                size="mini"
                label="VID"
                value="vid"
                checked={options === 'vid'}
                onChange={searchHandleChange}
              />
              <Form.Field>
                <Input
                  name="keyword"
                  size="small"
                  onChange={searchKeywordChange}
                  disabled={options === 'time' ? true : false}
                />
              </Form.Field>
              <Form.Button
                size="tiny"
                icon="search"
                content="조회"
                labelPosition="left"
                onClick={search}
              />
            </>
          )}
          <Form.Button
            size="tiny"
            content={crud === 'r' ? '등록' : '목록'}
            icon={crud === 'r' ? 'right arrow' : 'left arrow'}
            labelPosition={crud === 'r' ? 'right' : 'left'}
            onClick={() => {
              if (crud === 'r') {
                setCrud('c');
              } else {
                setCrud('r');
              }
            }}
          />
          <Form.Button
            size="tiny"
            content="데이터삭제"
            color="red"
            onClick={deleteVideos}
          />
        </Form.Group>
      </Form>
      {crud === 'r' && (
        <Segment>
          <MAgGrid
            columns={columns}
            rows={data}
            width={'100%'}
            height={'77vh'}
            rowHeight={70}
            onDoubleClicked={doubleClicked}
            isAutoSizeColumn={false}
            onSelection={onSelection}
          />
        </Segment>
      )}
      {(crud === 'c' || crud === 'e') && (
        <YoutubePastorRegister
          upperFn={fnSub}
          params={editParams}
          crud={crud}
        />
      )}
    </Container>
  );
}

const columns = [
  {
    field: 'check',
    width: 30,
    headerCheckboxSelection: false,
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
