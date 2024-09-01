import {
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
  Box,
} from '@mui/material';
import { LocationOnOutlined, RssFeedOutlined } from '@mui/icons-material';
import { CameraTable } from './CameraTable';
import { CameraProps } from '../../types/camera';
import { Table } from '@tanstack/react-table';
import { PaginationView } from './PaginationView';
export interface IAppProps {
  handleLocationChange: (e) => void;
  handleStatusChange: (e) => void;
  cameraTable: Table<CameraProps>;
  data: CameraProps[];
}

export function TableContainer(props: IAppProps) {
  const { handleLocationChange, cameraTable, data, handleStatusChange } = props;

  const locations = Array.from(new Set(data.map((camera) => camera.location)));
  const status = Array.from(new Set(data.map((camera) => camera.status)));
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: '1rem',
        margin: '1rem',
        height: 'calc(100% - 21%)',
        overflowY: 'auto',
      }}
    >
      <Box display={'flex'} gap={1}>
        <Select
          name="camera-locations"
          id="camera-location"
          onChange={handleLocationChange}
          displayEmpty
          defaultValue={''}
          sx={{
            minWidth: '12rem',
            '& .MuiInputBase-input': {
              paddingBlock: '0.5rem',
            },
          }}
          input={
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <LocationOnOutlined />
                </InputAdornment>
              }
            />
          }
        >
          <MenuItem value="">Locations</MenuItem>
          {locations.map((location, index) => (
            <MenuItem key={index} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>

        <Select
          name="camera-status"
          id="camera-status"
          onChange={handleStatusChange}
          displayEmpty
          defaultValue={''}
          sx={{
            paddingBlock: 0,
            minWidth: '12rem',
            '& .MuiInputBase-input': {
              paddingBlock: '0.5rem',
            },
          }}
          input={
            <OutlinedInput
              startAdornment={
                <InputAdornment position="start">
                  <RssFeedOutlined />
                </InputAdornment>
              }
            />
          }
        >
          <MenuItem value="">Status</MenuItem>
          {status.map((location, index) => (
            <MenuItem key={index} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        style={{
          overflowY: 'auto',
          height: 'calc(100% - 120px)',
        }}
      >
        <CameraTable cameraTable={cameraTable} />
      </Box>
      <PaginationView cameraTable={cameraTable} />
    </Box>
  );
}
