import {createTheme} from "@material-ui/core/styles";


const createAppTheme = (darkMode: boolean = true) =>
{
  const titleFontFamily = `"Quicksand", "Roboto", "Helvetica", sans-serif`;
  const fontFamily = `"Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif`;

  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        light: darkMode ? "#363636" : "#fff9f3",
        main: "#ffe0b2",
        dark: "#b29c7c"
      },
      secondary: {
        light: "#f9c8d9",
        main: "#f8bbd0",
        dark: "#ad8291"
      },
      background: {
        default: darkMode ? "#121212" : "#f5f3ef",
        paper: darkMode ? "#1e1e1e" : "#ffffff"
      }
    },
    typography: {
      fontFamily: fontFamily,
      h1: {
        fontFamily: titleFontFamily,
        fontSize: '4rem'
      },
      h2: {
        fontFamily: titleFontFamily,
        fontSize: '3rem'
      },
      h3: {
        fontFamily: titleFontFamily,
        fontSize: '2rem'
      },
      h4: {
        fontFamily: titleFontFamily,
        fontSize: '1.8rem'
      },
      h5: {
        fontFamily: titleFontFamily,
        fontSize: '1.6rem'
      },
      h6: {
        fontFamily: fontFamily,
        fontSize: '1.2rem',
      },
      subtitle1: {
        fontFamily: titleFontFamily,
        fontSize: '1.2rem',
      },
      subtitle2: {
        fontFamily: titleFontFamily,
        fontSize: '1.1rem',
      },
      button: {
        fontFamily: fontFamily,
        fontSize: '1rem'
      }
    }
  });
}


export default createAppTheme;
