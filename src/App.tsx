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
import {CharacterApi, CharacterApiAxiosParamCreator, UserApi} from "./api/backend";


const StyledBody = styled.div`
  width: 90vw;
  
  margin-left: auto;
  margin-right: auto;
`;


const App = () => {
  const api = new CharacterApi();
  api.characterGet();

  const userApi = new UserApi();
  userApi
      .userLoginPost({email: "lol@gmail.com", password: "lmao"})
      .then(result => {
        console.log(result.data.authToken);
      });

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

            <Route path={"/character"}>
              <CharacterPage/>
            </Route>

            <Route path={"/"}>
              <HomePage/>
            </Route>
          </Switch>
        </StyledBody>

      </Router>

    </ThemeProvider>
  </>;
};

export default App;
