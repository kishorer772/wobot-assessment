import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#241f31',
      50: '#deddda',
    },
    error: {
      main: '#c1121f',
    },
    secondary: {
      main: '#0fa3b1',
    },
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none' } } },
  },
});
