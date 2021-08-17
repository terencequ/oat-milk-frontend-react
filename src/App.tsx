import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import NavBar from "./modules/core/components/NavBar";
import HomePage from "./modules/core/pages/HomePage";
import LoginPage from "./modules/users/pages/LoginPage";
import CharacterViewPage from "./modules/characters/pages/CharacterViewPage";
import {CssBaseline, Fade, ThemeProvider, Zoom} from "@material-ui/core";
import styled from "@emotion/styled";
import PrivateRoute from "./modules/core/components/PrivateRoute";
import {useAppSelector} from "./redux/hooks";
import createAppTheme from "./theme";
import CharacterCreatePage from "./modules/characters/pages/CharacterCreatePage";
import RegisterPage from "./modules/users/pages/RegisterPage";
import CharacterListPage from "./modules/characters/pages/CharacterListPage";


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
            <Route path={"/register"}>
              <RegisterPage/>
            </Route>
            <PrivateRoute path={"/characters"}>
              <CharacterListPage/>
            </PrivateRoute>
            <PrivateRoute path={"/character=:id"}>
              <CharacterViewPage/>
            </PrivateRoute>
            <PrivateRoute path={"/create"}>
              <CharacterCreatePage/>
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
