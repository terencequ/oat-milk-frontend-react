import React, {FC, FormEvent, useState} from "react";
import {CenteredCircularProgress, UserFormPageContainer } from "./UserFormStyles";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Logo from "../../shared/components/logo/Logo";
import {Button, FormControl, TextField, Typography} from "@material-ui/core";
import PasswordInput from "../../shared/components/forms/PasswordInput";
import {Redirect} from "react-router-dom";
import {login} from "../../../api/clients/UserClient";
import {isLoggedInSelector, setAuthToken} from "../../../redux/slices/usersSlice";
import {BottomMiddleFixedDiv} from "../../core/styles/GlobalStyles";
import MenuItemThemeButton from "../../shared/components/theme/MenuItemThemeButton";

const RegisterPage: FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Register
    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords do not match!");
        }
        setLoading(true);
        const [res, err] = await login({email: email, password: password});
        setLoading(false);
        setError(err?.message ?? null);
        dispatch(setAuthToken(res?.authToken ?? ""))
    };

    const usersState = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    const isLoggedIn = isLoggedInSelector(usersState);

    return <>
        {isLoggedIn && // This means user is logged in
            <Redirect to={'/'}/>
        }
        <UserFormPageContainer>
            <form onSubmit={handleRegister}>
                <div className="logo"><Logo/></div>
                <FormControl margin={'normal'}>
                    <TextField onChange={(e) => setDisplayName(e.target.value)} variant={"filled"} label={"Display Name"} value={displayName} required/>
                </FormControl>
                <FormControl margin={'normal'}>
                    <TextField onChange={(e) => setEmail(e.target.value)} variant={"filled"} label={"Email"} value={email} required/>
                </FormControl>
                <FormControl margin={'normal'}>
                    <PasswordInput label={"Password"} setPassword={setPassword} password={password}/>
                </FormControl>
                <FormControl margin={'normal'}>
                    <PasswordInput label={"Confirm Password"} setPassword={setConfirmPassword} password={confirmPassword}/>
                </FormControl>
                <FormControl margin={'normal'}>
                    {loading
                        ? <CenteredCircularProgress />
                        : <Button type="submit" variant={"contained"}>Register</Button>}
                </FormControl>
            </form>
            {error
                && error !== ""
                && <Typography variant={"caption"} align={"center"}>{error}</Typography>
            }
        </UserFormPageContainer>
        <BottomMiddleFixedDiv>
            <MenuItemThemeButton/>
        </BottomMiddleFixedDiv>
    </>
}

export default RegisterPage;