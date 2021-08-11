import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {Redirect} from "react-router-dom";
import Logo from "../../shared/components/logo/Logo";
import MenuItemThemeButton from "../../shared/components/theme/MenuItemThemeButton";
import {ActionStatus} from "../../../redux/models/actionStatus";
import {login} from "../../../redux/slices/usersSlice";
import {
  CenteredCircularProgress,
  UserFormPageContainer,
} from "./UserFormStyles";
import {BottomMiddleFixedDiv} from "../../core/styles/PositionStyles";
import PasswordInput from "../../shared/components/forms/PasswordInput";

const LoginPage: FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usersState = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();

  // Login
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return <>
    {usersState.authToken != null && // This means user is logged in
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
          {usersState.loginStatus === ActionStatus.InProgress
            ? <CenteredCircularProgress />
            : <Button type="submit" variant={"contained"}>Login</Button>}
        </FormControl>
      </form>
    </UserFormPageContainer>
    <BottomMiddleFixedDiv>
      <MenuItemThemeButton/>
    </BottomMiddleFixedDiv>
  </>;
};

export default LoginPage;
