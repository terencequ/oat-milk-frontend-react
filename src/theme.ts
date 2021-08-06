import {createTheme} from "@material-ui/core/styles";


const createAppTheme = (darkMode: boolean = true) =>
{
  const fontFamily = "\"Noto Sans\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif";

  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        light: "#ffe6c1",
        main: "#ffe0b2",
        dark: "#b29c7c"
      },
      secondary: {
        light: "#f9c8d9",
        main: "#f8bbd0",
        dark: "#ad8291"
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#fafafa"
      }
    },
    typography: {
      fontFamily: fontFamily,
      h1: {
        fontFamily: fontFamily
      },
      h2: {
        fontFamily: fontFamily
      },
      h3: {
        fontFamily: fontFamily
      },
      h4: {
        fontFamily: fontFamily
      },
      h5: {
        fontFamily: fontFamily
      },
      h6: {
        fontFamily: fontFamily
      }
    }
  });
}


export default createAppTheme;
