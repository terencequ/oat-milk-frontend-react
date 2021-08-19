import React, {useState} from 'react';
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


const StyledBody = styled.div<{leftDrawerOpen: boolean, drawerWidth: number }>`
  margin-right: auto;
  width: calc(100% - ${props => props.leftDrawerOpen ? props.drawerWidth : 0}px);
  margin-left: ${props => props.leftDrawerOpen ? props.drawerWidth : 0}px;
  transition: ${props => {
    const theme = props.theme as Theme;
    return props.leftDrawerOpen ?
        theme.transitions.create(['margin', 'width'], { // Enter screen animation
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        })
        :
        theme.transitions.create(['margin', 'width'], { // Exit screen animation
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        })
  }}};
`;

const App = () => {
  const darkMode = useAppSelector(state => state.darkMode.darkMode);
  const theme = createAppTheme(darkMode);

  console.log(theme);

  document.title = "Oat Milk";

  const drawerWidth = 350;
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <NavBar leftDrawerOpen={leftDrawerOpen} setLeftDrawerOpen={setLeftDrawerOpen} drawerWidth={drawerWidth}/>
        <StyledBody leftDrawerOpen={leftDrawerOpen} drawerWidth={drawerWidth}>
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
