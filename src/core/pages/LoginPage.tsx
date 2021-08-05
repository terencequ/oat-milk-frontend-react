import React, {ChangeEvent, MouseEvent, useState} from 'react';
import styled from "@emotion/styled";

import logo from "../../assets/logo-128px.png";
import {
  Button, Card, CardContent, Checkbox, FilledInput,
  FormControl, FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField, Theme,
  Typography
} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";



const StyledWrap = styled.div`
  width: 100%;
  
  display: flex;
  flex-flow: column;
  
  align-items: center;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  width: 20vw;
  height: 50vh;
  
  margin-top: 15vh;
  
  display: flex;
  flex-flow: column;
  justify-content: center;
`;

const StyledCardContent = styled(CardContent)`
  height: 100%;
  padding: 24px 24px 32px;

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

const StyledLogo = styled.img`
  max-width: 128px;
  max-height: 128px;
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



const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value !== password) setEmail(value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value !== password) setPassword(value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRemember = () => {
    setRemember(!remember);
  };

  const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {

  };


  return <>
    <StyledWrap>
      <StyledCard>
        <StyledCardContent>

          <StyledHeroContainer>
            <StyledLogo src={logo}/>
            <Typography variant={"h4"} style={{alignSelf: "center"}}>Oat Milk</Typography>
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

          <FormControl>
            <FormControlLabel control={
              <Checkbox size={"small"} value={remember} onChange={handleRemember}/>
            } label={"Remember me"} />
          </FormControl>

          <StyledFormControl spacing={3}>
            <Button
              variant={"contained"}
              onClick={handleLogin}
            >Login</Button>
          </StyledFormControl>

        </StyledCardContent>
      </StyledCard>
    </StyledWrap>
  </>;
};

export default LoginPage;
