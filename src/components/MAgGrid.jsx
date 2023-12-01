import React, { useCallback, useRef, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { useRecoilValue } from 'recoil';
import { smallMenuState } from '../atoms/GlobalState';

export default function MAgGrid({
  rows,
  columns,
  width,
  height,
  rowHeight,
  onDoubleClicked,
  isAutoSizeColumn = false,
}) {
  const smallMenu = useRecoilValue(smallMenuState);

  const gridRef = useRef();

  const onFirstDataRendered = useCallback(() => {
    if (isAutoSizeColumn) gridRef.current.api.sizeColumnsToFit();
  }, [isAutoSizeColumn, gridRef]);

  const [columnDefs] = useState(columns);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  const onRowDoubleClicked = useCallback(
    (e) => {
      onDoubleClicked(e.data);
    },
    [onDoubleClicked]
  );

  console.log('smallMenu', smallMenu);

  return (
    <div style={{ height: height, width: width }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ fontSize: '13px', marginBottom: '5px' }}>
          {/* <span style={{ color: '#777' }}>
            &nbsp;&nbsp;&nbsp;All Finder : &nbsp;&nbsp;&nbsp;
          </span> */}
          <input
            type="text"
            id="filter-text-box"
            placeholder="Search any words ..."
            onInput={onFilterTextBoxChanged}
            style={{
              width: '300px',
              height: '24px',
              borderColor: 'rgba(34,36,38,.15)',
              borderWidth: '1px',
              borderRadius: '2px',
              padding: '5px',
              margin: '0',
            }}
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
            onRowDoubleClicked={onRowDoubleClicked}
            {...(rowHeight ? { rowHeight: rowHeight } : {})}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}
