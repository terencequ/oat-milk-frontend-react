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
import {
  CenteredCircularProgress,
  UserFormPageContainer,
} from "./UserFormStyles";
import {BottomMiddleFixedDiv} from "../../core/styles/PositionStyles";
import PasswordInput from "../../shared/components/forms/PasswordInput";
import {login} from "../../../api/clients/UserClient";
import {setAuthToken} from "../../../redux/slices/usersSlice";

const LoginPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usersState = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();

  // Login
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const [res, err] = await login({email: email, password: password});
    setLoading(false);
    setError(err?.message ?? null);
    dispatch(setAuthToken(res?.authToken ?? ""))
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
          {loading
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
