import { Header } from '../../components/Header';
import { CameraProps } from '../../types/camera';
import { useData, usePost } from '../../hooks/useData';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { getColumn } from './camera.columns';
import { useDeferredValue, useEffect, useState } from 'react';
import {
  TextField,
  SelectChangeEvent,
  Button,
  InputAdornment,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { Action, useConfirm } from '../../reducers/ConfirmDialog';
import { usePopup } from '../../reducers/popup';
import { TableContainer } from './TableContainer';

export type Meta = {
  dispatch: React.Dispatch<Action>;
};
export function Camera() {
  const { state, dispatch } = useConfirm();
  const { state: popupState, dispatch: popupDispatch } = usePopup();
  const [filter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const globalFilter = useDeferredValue(filter);
  const { postData, error, data: successResponse } = usePost(popupDispatch);
  const { data, loading } = useData<CameraProps>({
    url: '/v1/fetch/cameras',
  });
  useEffect(() => {
    if (error) {
      dispatch({ type: 'close' });
    }
  }, [error, dispatch]);
  useEffect(() => {
    if (successResponse) {
      popupDispatch({ type: 'open', message: 'Status Updated' });
    }
  }, [successResponse, popupDispatch]);
  const cameraTable = useReactTable({
    data,
    columns: getColumn(),
    meta: { dispatch } as Meta,
    state: {
      globalFilter,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  const handleLocationChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setColumnFilters((prevFilters) => [
      ...prevFilters.filter((filter) => filter.id !== 'location'),
      ...(value ? [{ id: 'location', value }] : []),
    ]);
  };

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setColumnFilters((prevFilters) => [
      ...prevFilters.filter((filter) => filter.id !== 'status'),
      ...(value ? [{ id: 'status', value }] : []),
    ]);
  };
  const handleClosePopup = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    popupDispatch({ type: 'close' });
  };
  return (
    <Box sx={{ backgroundColor: 'primary.50', height: '100vh', p: 1 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingInline: '0.5rem',
        }}
      >
        <Header />
        <TextField
          placeholder="Search Here"
          sx={{
            minWidth: '12rem',
            '.MuiInputBase-input': {
              paddingBlock: '0.5rem',
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchOutlined />
                </InputAdornment>
              ),
            },
          }}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading..</p>
      ) : (
        <TableContainer
          cameraTable={cameraTable}
          data={data}
          handleLocationChange={handleLocationChange}
          handleStatusChange={handleStatusChange}
        />
      )}
      <Dialog open={state?.open}>
        <DialogTitle>
          Confirm Changing {state?.data?.name} to {state?.mode}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure?
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => dispatch({ open: false, type: 'close' })}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              autoFocus
              color="secondary"
              onClick={() => {
                postData('/v1/update/camera/status', {
                  id: state.data.id,
                  status:
                    state.data.status === 'Active' ? 'Inactive' : 'Active',
                });
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={popupState?.open}
        autoHideDuration={1000}
        message={popupState?.data}
        color={popupState.mode === 'error' ? 'error' : 'success'}
        onClose={handleClosePopup}
      />
    </Box>
  );
}
