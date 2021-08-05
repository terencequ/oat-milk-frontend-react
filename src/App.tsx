import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import NavBar from "./core/components/navbar/NavBar";
import HomePage from "./core/pages/HomePage";
import LoginPage from "./core/pages/LoginPage";
import CharacterPage from "./core/pages/CharacterPage";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import theme from "./theme";
import styled from "@emotion/styled";
import PrivateRoute from "./core/components/override/PrivateRoute";

const StyledBody = styled.div`
  width: 90vw;
  
  margin-left: auto;
  margin-right: auto;
`;


const App = () => {

  document.title = "Oat Milk";
  console.log(process.env)

  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <Router>
        <NavBar/>

        <StyledBody>
          <Switch>
            <Route path={"/login"}>
              <LoginPage/>
            </Route>

            <PrivateRoute path={"/character"}>
              <CharacterPage/>
            </PrivateRoute>

            <PrivateRoute path={"/"}>
              <HomePage/>
            </PrivateRoute>
          </Switch>
        </StyledBody>

      </Router>

    </ThemeProvider>
  </>;
};

export default App;
