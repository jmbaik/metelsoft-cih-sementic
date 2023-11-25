import React from 'react';

import DataGrid from 'react-data-grid';
import { useFetchAreaCode } from './../../api/commonCodeApi';
import {
  Breadcrumb,
  Container,
  Divider,
  Header,
  Segment,
} from 'semantic-ui-react';

const columns = [
  { key: 'areaCode', name: 'Area Code' },
  {
    key: 'name',
    name: '지역명',
  },
  {
    key: 'aliasCode',
    name: 'Alias',
  },
];

export default function AreaCode() {
  const { data } = useFetchAreaCode();
  return (
    // <Container fluid>
    <>
      <Breadcrumb>
        <Breadcrumb.Section link>Home</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section link>Registration</Breadcrumb.Section>
        {/* <Breadcrumb.Divider icon="right arrow" /> */}
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Personal Information</Breadcrumb.Section>
      </Breadcrumb>
      <Header as="h2">지역 코드</Header>
      <DataGrid
        className="rdg-light"
        columns={columns}
        rows={data ?? []}
        rowHeight={30}
      />
    </>
    // </Container>
  );
}
