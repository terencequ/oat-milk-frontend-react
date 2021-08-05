import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import NavBar from "./core/NavBar";
import HomePage from "./core/pages/HomePage";
import LoginPage from "./core/pages/LoginPage";
import CharacterPage from "./core/pages/CharacterPage";
import {createTheme, CssBaseline, ThemeProvider} from "@material-ui/core";


const App = () => {

  const theme = createTheme({});

  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <Router>
        <NavBar/>

        <Switch>
          <Route path={"/login"}>
            <LoginPage/>
          </Route>

          <Route path={"/character"}>
            <CharacterPage/>
          </Route>

          <Route path={"/"}>
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </>;
};

export default App;
