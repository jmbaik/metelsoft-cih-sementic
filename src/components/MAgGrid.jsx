import React, { useCallback, useRef, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';

export default function MAgGrid({ rows, columns, width, height }) {
  const gridRef = useRef();
  const onFirstDataRendered = useCallback(
    (params) => {
      gridRef.current.api.sizeColumnsToFit();
    },
    [gridRef]
  );

  const [columnDefs] = useState(columns);
  return (
    <div
      className="ag-theme-alpine"
      style={{ height: height, width: width }}
      // style={{ height: '800px', width: '800px' }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={rows}
        columnDefs={columnDefs}
        rowHeight={30}
        headerHeight={30}
        onFirstDataRendered={onFirstDataRendered}
      ></AgGridReact>
    </div>
  );
}
