import { createColumnHelper } from '@tanstack/react-table';
import { CameraProps } from '../../types/camera';
import {
  CloudQueue,
  Delete,
  InfoOutlined,
  PlayArrow,
  StopSharp,
  Storage,
} from '@mui/icons-material';
import { Checkbox, IconButton, CircularProgress } from '@mui/material';
import { Action } from '../../reducers/ConfirmDialog';

type Meta = {
  dispatch: React.Dispatch<Action>;
};
const columnHelper = createColumnHelper<CameraProps>();
function isActive(row) {
  return row?.original.status.toLowerCase() === 'active' ? true : false;
}
const name = columnHelper.accessor('name', {
  header: ({ table }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
        <p>Name</p>
      </div>
    );
  },
  cell: ({ row }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          width: '12rem',
        }}
      >
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
        <span
          style={{
            width: '12px',
            backgroundColor:
              row.original.current_status === 'Online' ? 'green' : 'red',
            height: '12px',
            borderRadius: '50%',
          }}
        ></span>
        <p>{row.original.name}</p>
        {row.original.hasWarning && <InfoOutlined color="warning" />}
      </div>
    );
  },
});
const health = columnHelper.accessor('health', {
  header: () => <p style={{ textAlign: 'start' }}>Health</p>,
  cell: ({ row }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CloudQueue />
        <div
          style={{
            display: 'flex',
            position: 'relative',
            margin: 8,
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            thickness={4}
            sx={{
              color: '#e0e0e0',
              position: 'absolute',
            }}
          />
          <CircularProgress
            variant="determinate"
            value={25}
            thickness={4}
            sx={{
              position: 'absolute',
            }}
            color={row.original.health.device !== 'A' ? 'warning' : 'primary'}
          />
          <span style={{ paddingInline: '1rem' }}>
            {row.original.health.cloud}
          </span>
          -
        </div>
        <Storage />{' '}
        <div
          style={{
            display: 'flex',
            position: 'relative',
            margin: 8,
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            thickness={4}
            sx={{
              color: '#e0e0e0',
              position: 'absolute',
            }}
          />
          <CircularProgress
            variant="determinate"
            value={25}
            thickness={4}
            sx={{
              borderRadius: 8,
              position: 'absolute',
            }}
            color={row.original.health.device !== 'A' ? 'warning' : 'primary'}
          />
          <span style={{ paddingInline: '1rem' }}>
            {row.original.health.device}
          </span>
        </div>
      </div>
    );
  },
});
const location = columnHelper.accessor('location', {
  header: () => <p style={{ textAlign: 'start' }}>Location</p>,
  cell: ({ row }) => {
    return <p style={{ textAlign: 'start' }}>{row.original.location}</p>;
  },
  filterFn: 'equals',
});
const tasks = columnHelper.accessor('tasks', {
  header: () => <p style={{ textAlign: 'start' }}>Tasks</p>,
  cell: ({ row }) => {
    return (
      <p style={{ textAlign: 'start' }}>
        {+row.original.tasks < 2
          ? row.original.tasks + ' task'
          : row.original.tasks + ' tasks'}{' '}
      </p>
    );
  },
});
const recorder = columnHelper.accessor('recorder', {
  header: () => <p style={{ textAlign: 'start' }}>Recorder</p>,
  cell: ({ row }) => {
    return (
      <p style={{ textAlign: 'start' }}>{row.original.recorder || 'N/A'}</p>
    );
  },
});
const status = columnHelper.accessor('status', {
  header: () => <p style={{ textAlign: 'start' }}>Status</p>,
  cell: ({ row }) => {
    return (
      <p
        style={{
          width: 'fit-content',
          padding: '0.5rem',
          backgroundColor: isActive(row) ? `HSL(132, 76%, 95%)` : '#f6f5f4',
          color: isActive(row) ? `#33d17a` : '#77767b',
          fontWeight: '600',
        }}
      >
        {row.original.status}
      </p>
    );
  },
  filterFn: 'equals',
});
const action = columnHelper.accessor('current_status', {
  header: () => <p style={{ textAlign: 'start' }}>Actions</p>,
  cell: ({ table, row }) => {
    const { dispatch } = table.options.meta as Meta;
   
    return (
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <IconButton
          onClick={() => console.log(row.original.id)}
          sx={{
            textAlign: 'start',
            '&:hover': {
              color: 'red',
            },
          }}
        >
          <Delete />
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch({
              type: 'open',
              data: row.original,
              mode: row.original.status === 'Active' ? 'Inactive' : 'Active',
            });
          }}
          sx={{
            textAlign: 'start',
            color: row.original.status === 'Active' ? 'red' : 'green',
            '&:hover': {},
          }}
        >
          {row.original.status === 'Active' ? <StopSharp /> : <PlayArrow />}
        </IconButton>
      </div>
    );
  },
});

export const getColumn = () => [
  name,
  health,
  location,
  tasks,
  recorder,
  status,
  action,
];
