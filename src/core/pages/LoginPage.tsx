import React, {ChangeEvent, FC, MouseEvent, useState} from 'react';
import styled from "@emotion/styled";

import logo from "../../assets/logo-128px.png";
import {
  Button, Card, CardContent, CircularProgress, FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField, Theme,
  Typography
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {UserApi} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {useAppDispatch} from "../../redux/hooks";
import {setAuth} from "../../redux/reducers/authSlice";
import {useHistory} from "react-router-dom";
import Logo from "../components/logo/Logo";
import MenuItemThemeButton from "../components/theme/MenuItemThemeButton";



const StyledWrap = styled.div`
  width: 100%;
  height: 90vh;
  
  display: flex;
  flex-flow: column;
  
  align-items: center;
  justify-content: center;
`;

const StyledContainer = styled.div`
  width: 450px;
  max-width: 95vw;
  
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const StyledContainerContent = styled.div`
  height: 100%;
  padding: 24px 24px 24px;

  display: flex;
  flex-flow: column;
  justify-content: center;
`;


const StyledHeroContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  margin: 3vh auto;
`;

interface StyledFormControlProps {
  spacing?: number;
}

const StyledFormControl = styled(FormControl)<StyledFormControlProps>`
  width: 100%;
  margin: ${p => {
    const thm = p.theme as Theme;
    return thm.spacing(p.spacing ?? 1);
  }} 0;
`;

const StyledCircularProgressWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledThemeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;


const LoginPage: FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value !== password) setEmail(value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.slice(value.length-1) === "\n")
    {
      handleLogin();
      return;
    }
    if (value !== password) setPassword(value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e?: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);

    const api = new UserApi(undefined, process.env.REACT_APP_API_URL);
    api.userLoginPost({
      email: email,
      password: password
    })
    .then(res => {
      setLoading(false);

      if (res.status !== 200)
      {
        // TODO: Toaster here
        return;
      }

      dispatch(setAuth(res.data.authToken ?? ""));

      history.push("/");
    });
  };

  return <>
    <StyledWrap>
      <StyledContainer>
        <StyledContainerContent>
          <StyledHeroContainer>
            <Logo></Logo>
          </StyledHeroContainer>

          <StyledFormControl>
            <TextField
              onChange={handleEmailChange}
              variant={"filled"}
              label={"Email"}
              value={email}
              required
            />
          </StyledFormControl>

          <StyledFormControl variant={"filled"}>
            <InputLabel htmlFor={"filled-adornment-password"}>Password</InputLabel>
            <FilledInput
              id={"filled-adornment-password"}
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
              value={password}
              required
              endAdornment={
                <InputAdornment position={"end"}>
                  <IconButton
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </StyledFormControl>

          <StyledFormControl spacing={3}>
            {loading
              ? <StyledCircularProgressWrap>
                  <CircularProgress />
                </StyledCircularProgressWrap>
              : <Button
                  variant={"contained"}
                  onClick={handleLogin}
                >Login</Button>}
          </StyledFormControl>
        </StyledContainerContent>
      </StyledContainer>
    </StyledWrap>
    <StyledThemeButton>
      <MenuItemThemeButton/>
    </StyledThemeButton>
  </>;
};

export default LoginPage;
