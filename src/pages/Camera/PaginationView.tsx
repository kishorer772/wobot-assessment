import { Select, MenuItem, Button } from '@mui/material';
import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  KeyboardDoubleArrowLeftOutlined,
  KeyboardDoubleArrowRightOutlined,
} from '@mui/icons-material';
import { Table } from '@tanstack/react-table';
import { CameraProps } from '../../types/camera';

export interface IAppProps {
  cameraTable: Table<CameraProps>;
}

export function PaginationView(props: IAppProps) {
  const { cameraTable } = props;
  const { pageIndex, pageSize } = cameraTable.getState().pagination;
  const totalRows = cameraTable.getFilteredRowModel().rows.length;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
        gap: '0.25rem',
        paddingInline: '2rem',
      }}
    >
      <Button
        onClick={() => cameraTable.firstPage()}
        disabled={!cameraTable.getCanPreviousPage()}
      >
        <KeyboardDoubleArrowLeftOutlined />
      </Button>
      <Button
        onClick={() => cameraTable.previousPage()}
        disabled={!cameraTable.getCanPreviousPage()}
      >
        <KeyboardArrowLeftOutlined />
      </Button>
      <Button
        color="primary"
        onClick={() => cameraTable.nextPage()}
        disabled={!cameraTable.getCanNextPage()}
      >
        <KeyboardArrowRightOutlined />
      </Button>
      <Button
        onClick={() => cameraTable.lastPage()}
        disabled={!cameraTable.getCanNextPage()}
      >
        <KeyboardDoubleArrowRightOutlined />
      </Button>
      <p style={{ display: 'flex', alignItems: 'center' }}>
        <span>
          {pageIndex * pageSize + 1} - {(pageIndex + 1) * pageSize} of{' '}
          {totalRows}
        </span>
      </p>
      <Select
        value={cameraTable.getState().pagination.pageSize}
        onChange={(e) => {
          cameraTable.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <MenuItem key={pageSize} value={pageSize}>
            {pageSize}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
