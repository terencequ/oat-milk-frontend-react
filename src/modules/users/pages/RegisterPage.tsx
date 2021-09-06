import React, {FC, FormEvent, useState} from "react";
import {CenteredCircularProgress, UserFormPageContainer } from "./UserFormStyles";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Logo from "../../shared/components/Logo";
import {Button, Divider, FormControl, Link, TextField, Typography} from "@material-ui/core";
import PasswordInput from "../../shared/components/PasswordInput";
import {Link as RouterLink, Redirect} from "react-router-dom";
import {login, register} from "../../../redux/thunks/userThunks";
import {isLoggedInSelector} from "../../../redux/slices/usersSlice";
import {BottomMiddleFixedDiv} from "../../core/styles/GlobalStyles";
import MenuItemThemeButton from "../../shared/components/MenuItemThemeButton";
import {requestSelector} from "../../../redux/slices/requestsSlice";
import {RequestStatus} from "../../../redux/actions/requestStatus";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";

const RegisterPage: FC = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useAppDispatch();
    const isLoggedIn = isLoggedInSelector()();
    const { status, error } = requestSelector(login.name)();

    // Register
    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register({displayName, email, password}));
    };

    const darkmode = useAppSelector(state => state.userInterface.darkMode);
    document.title = "Oat Milk - Register"
    dispatch(setBackground(`url("images/background-entry${darkmode ? "-dark" : ""}.svg")`));
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
                    {status === RequestStatus.InProgress
                        ? <CenteredCircularProgress color={"secondary"}/>
                        : <Button type="submit" variant={"contained"}>Register</Button>}
                </FormControl>
                <Link align="center" component={RouterLink} to={"/login"} color={"inherit"} underline={"hover"}>Have an account? Login here!</Link>
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