import React, {FC, FormEvent, useState} from 'react';
import {
  Button,
  FormControl, Link,
  TextField, Typography,
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {Redirect} from "react-router-dom";
import Logo from "../../shared/components/Logo";
import MenuItemThemeButton from "../../shared/components/MenuItemThemeButton";
import {
  CenteredCircularProgress,
  UserFormPageContainer, UserFormSubmitButton,
} from "./UserFormStyles";
import {StyledBottomMiddleFixedCard} from "../../core/styles/GlobalStyles";
import PasswordInput from "../../shared/components/PasswordInput";
import {login} from "../../../redux/thunks/userThunks";
import {isLoggedInSelector} from "../../../redux/slices/usersSlice";
import {requestSelector} from "../../../redux/slices/requestsSlice";
import {RequestStatus} from "../../../redux/actions/requestStatus";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";
import { Link as RouterLink } from "react-router-dom";
import entryBackground from "assets/images/background-entry.svg";
import entryBackgroundDark from "assets/images/background-entry-dark.svg";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const isLoggedIn = isLoggedInSelector()();
  const { status, error } = requestSelector(login.name)();

  // Login
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({email: email, password: password}));
  };

  const darkmode = useAppSelector(state => state.userInterface.darkMode);
  document.title = "Oat Milk - Login"
  dispatch(setBackground(`url("${darkmode ? entryBackgroundDark : entryBackground}")`));
  return <>
    {isLoggedIn &&
      <Redirect to={'/'}/>
    }
    <UserFormPageContainer>
      <form onSubmit={handleLogin}>
        <div className="logo"><Logo/></div>
        <FormControl margin={'normal'}>
          <TextField size="small" onChange={(e) => setEmail(e.target.value)} variant={"filled"} label={"Email"} value={email} required/>
        </FormControl>
        <FormControl margin={'normal'}>
          <PasswordInput label={"Password"} password={password} setPassword={setPassword}/>
        </FormControl>
        <UserFormSubmitButton margin={'normal'}>
          {status === RequestStatus.InProgress
            ? <CenteredCircularProgress color={"secondary"}/>
            : <Button type="submit" variant={"contained"}>Login</Button>}
        </UserFormSubmitButton>
        <Link
            align="center"
            component={RouterLink}
            to={"/register"}
            color={"inherit"}
            underline={"hover"}
            variant={"body2"}>
          Don't have an account? Register here!
        </Link>
      </form>
      {error
        && error !== ""
        && <Typography variant={"caption"} color={"error"} align={"center"}>{error}</Typography>
      }
    </UserFormPageContainer>
    <StyledBottomMiddleFixedCard>
      <MenuItemThemeButton/>
    </StyledBottomMiddleFixedCard>
  </>;
};

export default LoginPage;
