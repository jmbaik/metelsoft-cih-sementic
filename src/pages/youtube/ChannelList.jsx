import React from 'react';
import { Breadcrumb, Header, Segment } from 'semantic-ui-react';
import MAgGrid from '../../components/MAgGrid';
import { useFetchOriginVid } from './../../api/youtubeVideo';
import MBreadcrumb from '../../components/MBreadcrumb';

const columns = [
  {
    field: 'channelId',
    headerName: '채널 ID',
    width: 300,
  },
  {
    field: 'channelTitle',
    headerName: '채널명',
    sortable: true,
  },
  {
    field: 'shortDescription',
    headerName: 'Description',
  },
  {
    field: 'channelId',
    headerName: '바로 가기',
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
    field: 'updId',
    headerName: '최종수정자',
    sortable: true,
  },
  {
    field: 'updDt',
    headerName: '최종수정일',
    sortable: true,
  },
];

export default function ChannelList() {
  const { data } = useFetchOriginVid();
  return (
    <>
      <MBreadcrumb first={'Home'} second={'Youtube'} third={'Channel List'} />
      <Header as="h2" dividing>
        Channel 조회
      </Header>
      <Segment>
        <MAgGrid
          columns={columns}
          rows={data}
          width={'100%'}
          height={'80vh'}
          onDoubleClicked={() => {}}
        />
      </Segment>
    </>
  );
}
