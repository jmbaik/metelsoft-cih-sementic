import React from 'react';

import { useFetchAreaCode } from './../../api/commonCodeApi';
import { Header, Segment } from 'semantic-ui-react';
import MAgGrid from '../../components/MAgGrid';
import MBreadcrumb from '../../components/MBreadcrumb';

export default function AreaCode() {
  const columns = [
    { field: 'areaCode', headerName: 'Area Code' },
    { field: 'name', headerName: '지역명' },
    { field: 'aliasCode', headerName: 'Alias' },
  ];

  const { data } = useFetchAreaCode();
  return (
    // <Container fluid>
    <>
      <MBreadcrumb
        first={'Home'}
        second={'Admin Management'}
        third={'Local Area Code'}
      />
      <Header as="h2" dividing>
        지역 코드
      </Header>
      <Segment>
        <MAgGrid
          columns={columns}
          rows={data}
          width={'100%'}
          height={'80vh'}
          onDoubleClicked={() => {}}
          isAutoSizeColumn={false}
        />
      </Segment>
    </>
    // </Container>
  );
}
