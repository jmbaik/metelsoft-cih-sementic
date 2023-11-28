import React, { useEffect, useState } from 'react';
import { useFetchChurchCode, useFetchPastor } from '../../api/commonCodeApi';
import { Button, Container, Header } from 'semantic-ui-react';
import MBreadcrumb from '../../components/MBreadcrumb';
import MAgGrid from '../../components/MAgGrid';
import ChurchRegister from './ChurchRegister';
import PastorRegister from './PastorRegister';

const columns = [
  {
    field: 'pastorCode',
    headerName: 'Pastor Code',
  },
  {
    field: 'churchCode',
    headerName: '교회 코드',
    sortable: true,
  },
  {
    field: 'churchName',
    headerName: '교회명',
    sortable: true,
  },
  {
    field: 'grade',
    headerName: 'Grade',
    sortable: true,
  },
  {
    field: 'name',
    headerName: '목사님',
    sortable: true,
  },
  {
    field: 'comment',
    hide: true,
  },
  {
    field: 'pic',
    headerName: 'Pic',
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

export default function PastorList({ cr }) {
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

  const { isLoading, data, isError, error } = useFetchPastor();

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
        목사님 등록
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
        <MAgGrid
          columns={columns}
          rows={data}
          width={'100%'}
          height={'70vh'}
          onDoubleClicked={doubleClicked}
        />
      )}
      {(crud === 'c' || crud === 'e') && (
        <PastorRegister upperFn={fnSub} params={editParams} crud={crud} />
      )}
    </Container>
  );
}
