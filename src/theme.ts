import {createTheme} from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffcdbf',
      dark: "#fdbc82"
    },
    background: {
      default: "#fff6ee",
      paper: "#fdf3ea"
    }
  }
});

export default theme;