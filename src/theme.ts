import {createTheme} from "@material-ui/core/styles";


const createAppTheme = (darkMode: boolean = true) =>
{
  const titleFontFamily = `"Quicksand", "Roboto", "Helvetica", sans-serif`;
  const fontFamily = `"Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif`;

  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        light: darkMode ? "#363636" : "#f5f4f0",
        main: "#ffe0b2",
        dark: "#b29c7c"
      },
      secondary: {
        light: "#f6afc5",
        main: "#ff538e",
        dark: "#6b434d"
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
        fontSize: '4rem',
        fontWeight: 400
      },
      h2: {
        fontFamily: titleFontFamily,
        fontSize: '2.4rem',
        fontWeight: 400
      },
      h3: {
        fontFamily: titleFontFamily,
        fontSize: '1.6rem',
        fontWeight: 300
      },
      h4: {
        fontFamily: titleFontFamily,
        fontSize: '1.5rem'
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
      body1: {
        fontFamily: fontFamily,
        fontSize: '1rem'
      },
      button: {
        fontFamily: fontFamily,
        fontSize: '1rem'
      }
    }
  });
}


export default createAppTheme;
