import React from 'react';

import { useFetchAreaCode } from './../../api/commonCodeApi';
import { Breadcrumb, Header } from 'semantic-ui-react';
import MAgGrid from '../../components/MAgGrid';

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
      <Breadcrumb>
        <Breadcrumb.Section link>Home</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section link>Admin Management</Breadcrumb.Section>
        {/* <Breadcrumb.Divider icon="right arrow" /> */}
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Local Area Code</Breadcrumb.Section>
      </Breadcrumb>
      <Header as="h2">지역 코드</Header>
      <MAgGrid columns={columns} rows={data} width={'100%'} height={'80vh'} />
    </>
    // </Container>
  );
}
