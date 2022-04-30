import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import PasswordGenerator from './pages/PasswordGenerator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0329d6',
    },
    secondary: {
      main: '#5e6bda',
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={ theme }>
        <SnackbarProvider maxSnack={ 3 }>
          <PasswordGenerator />
        </SnackbarProvider>
      </ThemeProvider>
    );
  }
}

export default App;
