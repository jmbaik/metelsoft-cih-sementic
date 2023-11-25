import React from 'react';

import DataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' },
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' },
];
export default function AreaCode() {
  return <DataGrid className="rdg-light" columns={columns} rows={rows} />;
}
