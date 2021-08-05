import {createTheme} from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffe6c1',
      main: '#ffe0b2',
      dark: "#b29c7c"
    },
    secondary: {
      light: '#f9c8d9',
      main: '#f8bbd0',
      dark: "#ad8291"
    },
    background: {
      default: "#f5f5f5",
      paper: "#f0f0f0"
    }
  }
});

export default theme;
