import React from 'react';
import { useState } from 'react';
import { useFetchOriginVid } from '../../api/youtubeVideo';
import { useCallback } from 'react';
import MBreadcrumb from '../../components/MBreadcrumb';
import { Header, Segment } from 'semantic-ui-react';
import MAgGrid from '../../components/MAgGrid';
import SearchAutoRegister from './SearchAutoRegister';

export default function ChannelListBySearch() {
  const [crud, setCrud] = useState('r');
  const [editParams, setEditParams] = useState({});
  const fnSub = (read) => {
    if (read === 'r') setEditParams({});
    setCrud(read);
  };
  const { data } = useFetchOriginVid();
  const doubleClicked = useCallback((params) => {
    setEditParams(params);
    setCrud('e');
    console.log('doubleclicked', params);
  }, []);
  return (
    <>
      <MBreadcrumb first={'Home'} second={'Youtube'} third={'Channel List'} />
      <Header as="h2" dividing>
        Search 자동등록
      </Header>
      {crud === 'r' && (
        <Segment>
          <MAgGrid
            columns={columns}
            rows={data}
            width={'100%'}
            height={'80vh'}
            onDoubleClicked={doubleClicked}
          />
        </Segment>
      )}
      {(crud === 'c' || crud === 'e') && (
        <SearchAutoRegister upperFn={fnSub} params={editParams} crud={crud} />
      )}
    </>
  );
}

const columns = [
  {
    field: 'channelId',
    headerName: '채널 ID',
    width: 300,
  },
  {
    field: 'channelTitle',
    headerName: '채널명',
    width: 300,
    sortable: true,
  },
  {
    field: 'channelId',
    headerName: '바로 가기',
    width: 300,
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
    field: 'itemsCount',
    headerName: '등록영상갯수',
  },
  {
    field: 'updId',
    headerName: '최종자',
    width: 100,
    sortable: true,
  },
  {
    field: 'updDt',
    headerName: '최종수정일',
    sortable: true,
  },
];
