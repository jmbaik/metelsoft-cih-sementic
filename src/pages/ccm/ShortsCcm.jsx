import { useEffect, useState } from 'react';
import { Container, Form, Header, Image, Segment } from 'semantic-ui-react';
import MBreadcrumb from '../../components/MBreadcrumb';
import MAgGrid from '../../components/MAgGrid';
import ShortsCcmRegister from './ShortsCcmRegister';
import { useFetchYoutubeCcm } from '../../api/shortsCcmApi';

export default function ShortsCcm({ cr }) {
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
    console.log(param);
  }
  /* search */
  const [options, setOptions] = useState('time');
  const [keyword, setKeyword] = useState('');

  const [searchParams, setSearchParams] = useState({
    options: 'time',
    keyword: '',
  });

  const searchHandleChange = (e, { value }) => {
    setSearchParams(setOptions(value));
  };
  // console.log(searchParams);
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

  const { isLoading, data, isError, error } = useFetchYoutubeCcm(
    searchParams,
    crud
  );
  console.log(searchParams);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>{error.message}</h3>;
  return (
    <Container fluid>
      <MBreadcrumb first={'Home'} second={'Youtube'} third={'Ccmrity'} />
      <Header as="h2" dividing>
        나의 성장 - Shorts CCM
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
              <Form.Input
                name="keyword"
                size="mini"
                width={3}
                onChange={searchKeywordChange}
                disabled={options === 'time' ? true : false}
              />
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
          />
        </Segment>
      )}
      {(crud === 'c' || crud === 'e') && (
        <ShortsCcmRegister upperFn={fnSub} params={editParams} crud={crud} />
      )}
    </Container>
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
