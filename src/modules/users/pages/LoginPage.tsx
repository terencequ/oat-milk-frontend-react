import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Theme,
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {Redirect} from "react-router-dom";
import Logo from "../../shared/components/logo/Logo";
import MenuItemThemeButton from "../../shared/components/theme/MenuItemThemeButton";
import {ActionStatus} from "../../../redux/models/actionStatus";
import {login} from "../../../redux/slices/usersSlice";


const StyledContainer = styled.div`
  width: 450px;
  max-width: 95vw;

  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 8vw auto auto;
`;

const StyledForm = styled.form`
  padding: 24px 24px 24px;

  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const StyledLogo = styled.div`
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
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginPage: FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const usersState = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();

  // Form field handlers
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPassword(value);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Login
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return <>
    {usersState.authToken != null && // This means user is logged in
      <Redirect to={'/'}/>
    }
    <StyledContainer>
      <StyledForm onSubmit={handleLogin}>
        {/* Logo */}
        <StyledLogo><Logo/></StyledLogo>
        {/* Email field */}
        <StyledFormControl>
          <TextField onChange={handleEmailChange} variant={"filled"} label={"Email"} value={email} required/>
        </StyledFormControl>
        {/* Password field */}
        <StyledFormControl variant={"filled"}>
          <InputLabel htmlFor={"filled-adornment-password"}>Password</InputLabel>
          <FilledInput id={"filled-adornment-password"}
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
        {/* Login button */}
        <StyledFormControl spacing={3}>
          {usersState.loginStatus === ActionStatus.InProgress
            ? <StyledCircularProgressWrap><CircularProgress /></StyledCircularProgressWrap>
            : <Button type="submit" variant={"contained"}>Login</Button>}
        </StyledFormControl>
      </StyledForm>
    </StyledContainer>
    <StyledThemeButton>
      <MenuItemThemeButton/>
    </StyledThemeButton>
  </>;
};

export default LoginPage;
