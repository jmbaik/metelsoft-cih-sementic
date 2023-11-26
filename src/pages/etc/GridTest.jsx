import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useRef, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Breadcrumb, Container, Header } from 'semantic-ui-react';
import { useFetchAreaCode } from '../../api/commonCodeApi';

export default function GridTest() {
  const gridRef = useRef();
  const { data } = useFetchAreaCode();

  const [columnDefs] = useState([
    { field: 'areaCode', headerName: 'Area Code' },
    { field: 'name', headerName: '지역명' },
    { field: 'aliasCode', headerName: 'Alias' },
  ]);
  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Section link>Home</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section link>Admin Management</Breadcrumb.Section>
        {/* <Breadcrumb.Divider icon="right arrow" /> */}
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Local Code</Breadcrumb.Section>
      </Breadcrumb>
      <Header as="h2">지역 코드</Header>
      <div
        className="ag-theme-alpine"
        style={{ height: '800px', width: '800px' }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={data}
          columnDefs={columnDefs}
          rowHeight={30}
          headerHeight={30}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </Container>
  );
}
