import React, { useState } from 'react';
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react';
import MBreadcrumb from '../../components/MBreadcrumb';
import { useFetchChurchCode } from '../../api/commonCodeApi';
import MAgGrid from '../../components/MAgGrid';

export default function ChurchList({ cr }) {
  const columns = [
    {
      field: 'churchCode',
      headerName: '교회 코드',
      sortable: true,
    },
    {
      field: 'name',
      headerName: '교회명',
      sortable: true,
    },
    {
      field: 'comment',
      headerName: '설명',
    },
    {
      field: 'pic',
      headerName: 'Picture',
    },
  ];

  const [crud, setCrud] = useState('r');
  const [editParams, setEditParams] = useState({});

  const { isLoading, data, isError, error } = useFetchChurchCode();
  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>{error.message}</h3>;

  const fnSub = (read) => {
    if (read === 'r') setEditParams({});
    setCrud(read);
  };

  return (
    <Container fluid>
      <MBreadcrumb
        first={'Home'}
        second={'Admin Management'}
        third={'Church Code'}
      />
      <Header as="h2" dividing>
        교회 코드
      </Header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          width: '100%',
          marginBottom: '8px',
        }}
      >
        <Button
          basic
          content="등록"
          size="tiny"
          icon="right arrow"
          labelPosition="right"
        />
      </div>
      <MAgGrid columns={columns} rows={data} width={'100%'} height={'77vh'} />
    </Container>
  );
}
