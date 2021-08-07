import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import NavBar from "./core/components/NavBar";
import HomePage from "./core/pages/HomePage";
import LoginPage from "./core/pages/LoginPage";
import CharacterPage from "./core/pages/CharacterPage";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import styled from "@emotion/styled";
import PrivateRoute from "./core/components/override/PrivateRoute";
import {useAppSelector} from "./redux/hooks";
import createAppTheme from "./theme";
import CreateCharacterPage from "./core/pages/CreateCharacterPage";



const StyledBody = styled.div`
  width: 90vw;
  
  margin-left: auto;
  margin-right: auto;
`;



const App = () => {

  const darkMode = useAppSelector(state => state.darkMode.darkMode);
  const theme = createAppTheme(darkMode);

  console.log(theme);


  document.title = "Oat Milk";

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

            <PrivateRoute path={"/character=:id"}>
              <CharacterPage/>
            </PrivateRoute>

            <PrivateRoute path={"/create"}>
              <CreateCharacterPage/>
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
