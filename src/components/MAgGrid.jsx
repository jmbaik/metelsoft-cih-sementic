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

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  return (
    <div style={{ height: height, width: width }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ fontSize: '13px', marginBottom: '5px' }}>
          <span style={{ color: '#777' }}>
            &nbsp;&nbsp;&nbsp;ALL FINDER : &nbsp;&nbsp;&nbsp;
          </span>
          <input
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
            style={{ width: '200px', borderColor: '#eee' }}
          />
        </div>

        <div
          className="ag-theme-alpine"
          style={{ height: '100%', width: '100%' }}
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
      </div>
    </div>
  );
}
