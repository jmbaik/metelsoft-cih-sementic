import React, { useEffect, useState } from 'react';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import MBreadcrumb from '../../components/MBreadcrumb';
import { useFetchChurchCode } from '../../api/commonCodeApi';
import MAgGrid from '../../components/MAgGrid';
import ChurchRegister from './ChurchRegister';

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
  {
    field: 'areaCode',
    hide: true,
  },
];

export default function ChurchList({ cr }) {
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

  const { isLoading, data, isError, error } = useFetchChurchCode();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>{error.message}</h3>;

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
          marginBottom: '6px',
        }}
      >
        <Button
          basic
          primary
          content={crud === 'r' ? '등록' : '목록'}
          size="tiny"
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
      </div>
      {crud === 'r' && (
        <Segment>
          <MAgGrid
            columns={columns}
            rows={data}
            width={'100%'}
            height={'70vh'}
            onDoubleClicked={doubleClicked}
          />
        </Segment>
      )}
      {(crud === 'c' || crud === 'e') && (
        <ChurchRegister upperFn={fnSub} params={editParams} crud={crud} />
      )}
    </Container>
  );
}
