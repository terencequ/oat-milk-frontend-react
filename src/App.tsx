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
import {CssBaseline, Theme, ThemeProvider} from "@material-ui/core";
import styled from "@emotion/styled";
import PrivateRoute from "./modules/core/components/PrivateRoute";
import {useAppSelector} from "./redux/hooks";
import createAppTheme from "./theme";
import CharacterCreatePage from "./modules/characters/pages/CharacterCreatePage";
import RegisterPage from "./modules/users/pages/RegisterPage";
import CharacterListPage from "./modules/characters/pages/CharacterListPage";
import {drawerWidth} from "./modules/core/components/NavDrawer";


const StyledBody = styled.div`

`;

const App = () => {
  const darkMode = useAppSelector(state => state.userInterface.darkMode);
  const theme = createAppTheme(darkMode);

  console.log(theme);

  document.title = "Oat Milk";
  const drawerOpen = useAppSelector(state => state.userInterface.drawerOpen);

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
