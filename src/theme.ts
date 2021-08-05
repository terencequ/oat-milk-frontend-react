import {createTheme} from '@material-ui/core/styles';


const createAppTheme = (darkMode: boolean = true) =>
{
  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
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
        default: darkMode ? "#232323" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#fafafa"
      }
    }
  });
}


export default createAppTheme;
