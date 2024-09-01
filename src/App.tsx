// import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { Camera } from './pages/Camera';
import { theme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Camera />
    </ThemeProvider>
  );
}

export default App;
