import React, {FC, FormEvent, useState} from 'react';
import {
  Button,
  FormControl,
  TextField, Typography,
} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {Redirect} from "react-router-dom";
import Logo from "../../shared/components/Logo";
import MenuItemThemeButton from "../../shared/components/MenuItemThemeButton";
import {
  CenteredCircularProgress,
  UserFormPageContainer,
} from "./UserFormStyles";
import {BottomMiddleFixedDiv} from "../../core/styles/GlobalStyles";
import PasswordInput from "../../shared/components/PasswordInput";
import {login} from "../../../redux/thunks/userThunks";
import {isLoggedInSelector} from "../../../redux/slices/usersSlice";
import {requestSelector} from "../../../redux/slices/requestsSlice";
import {RequestStatus} from "../../../redux/actions/requestStatus";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";

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
  dispatch(setBackground(`url("images/background-entry${darkmode ? "-dark" : ""}.svg")`));
  return <>
    {isLoggedIn &&
      <Redirect to={'/'}/>
    }
    <UserFormPageContainer>
      <form onSubmit={handleLogin}>
        <div className="logo"><Logo/></div>
        <FormControl margin={'normal'}>
          <TextField onChange={(e) => setEmail(e.target.value)} variant={"filled"} label={"Email"} value={email} required/>
        </FormControl>
        <FormControl margin={'normal'}>
          <PasswordInput label={"Password"} password={password} setPassword={setPassword}/>
        </FormControl>
        <FormControl margin={'normal'}>
          {status === RequestStatus.InProgress
            ? <CenteredCircularProgress />
            : <Button type="submit" variant={"contained"}>Login</Button>}
        </FormControl>
      </form>
      {error
        && error !== ""
        && <Typography variant={"caption"} color={"error"} align={"center"}>{error}</Typography>
      }
    </UserFormPageContainer>
    <BottomMiddleFixedDiv>
      <MenuItemThemeButton/>
    </BottomMiddleFixedDiv>
  </>;
};

export default LoginPage;
