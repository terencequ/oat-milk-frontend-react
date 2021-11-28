import React, {useEffect} from 'react';
import {HashRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import './App.css';
import NavBar from "./modules/core/components/NavBar";
import HomePage from "./modules/core/pages/HomePage";
import LoginPage from "./modules/users/pages/LoginPage";
import CharacterPage from "./modules/characters/pages/CharacterPage";
import {CssBaseline} from "@mui/material";
import {Theme, ThemeProvider} from "@mui/material/styles";
import styled from "@emotion/styled";
import PrivateRoute from "./modules/core/components/PrivateRoute";
import {useAppSelector} from "./redux/hooks";
import createAppTheme from "./theme";
import RegisterPage from "./modules/users/pages/RegisterPage";
import CharacterListPage from "./modules/characters/pages/CharacterListPage";
import NavDrawer, {drawerMinimisedWidth, drawerWidth} from "./modules/core/components/NavDrawer";
import {isLoggedInSelector} from "./redux/slices/usersSlice";

const StyledRoot = styled.div`
  background-image: ${() => {
    return useAppSelector(state => state.userInterface.currentBackground);
  }};
  background-size: cover;
`

interface StyledBodyProps {
  drawerOpen: boolean;
  drawerMinimised: boolean;
}

const getDrawerWidth = (props: StyledBodyProps) => {
  let currentDrawerWidth = props.drawerOpen ? props.drawerMinimised ? drawerMinimisedWidth : drawerWidth : 0;
  const loggedIn = isLoggedInSelector()();
  if(!loggedIn) {
    currentDrawerWidth = 0;
  }
  return currentDrawerWidth+"px"
}

const StyledBody = styled.div<StyledBodyProps>`
  min-height: 100vh;
  margin-right: auto;
  margin-left: ${getDrawerWidth};
  width: calc(100% - ${getDrawerWidth});
  transition: ${props => {
    const theme = props.theme as Theme;
    return theme.transitions.create(['margin', 'width'], { // Enter screen animation
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        })
  }}};
`;

const App = () => {
  const darkMode = useAppSelector(state => state.userInterface.darkMode);
  const theme = createAppTheme(darkMode);
  document.title = "Oat Milk";
  const {drawerOpen, drawerMinimised} = useAppSelector(state => state.userInterface);

  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <StyledRoot>
          <NavBar/>
          <NavDrawer anchor={"left"}/>
          <StyledBody drawerOpen={drawerOpen} drawerMinimised={drawerMinimised}>
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
              <PrivateRoute path={"/character=:id/edit"}>
                <CharacterPage editModeStart={true}/>
              </PrivateRoute>
              <PrivateRoute path={"/character=:id/view"}>
                <CharacterPage editModeStart={false}/>
              </PrivateRoute>
              <PrivateRoute path={"/"}>
                <HomePage/>
              </PrivateRoute>
            </Switch>
          </StyledBody>
        </StyledRoot>
      </Router>
    </ThemeProvider>
  </>;
};

export default App;
