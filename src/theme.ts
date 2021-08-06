import {createTheme} from "@material-ui/core/styles";


const createAppTheme = (darkMode: boolean = true) =>
{
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
      fontFamily: "\"Noto Sans\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      h1: {
        fontFamily: "\"Noto Sans\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
      },
      h2: {
        fontFamily: "\"Noto Sans\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
      },
      h3: {
        fontFamily: "\"Noto Sans\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
      },
      h4: {
        fontFamily: "\"Noto Sans\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
      },
      h5: {
        fontFamily: "\"Noto Sans\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
      },
      h6: {
        fontFamily: "\"Noto Sans\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif"
      }
    }
  });
}


export default createAppTheme;
