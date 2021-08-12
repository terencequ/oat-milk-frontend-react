import React, {FC, FormEvent, useState} from "react";
import {CenteredCircularProgress, UserFormPageContainer } from "./UserFormStyles";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import Logo from "../../shared/components/logo/Logo";
import {Button, FormControl, TextField} from "@material-ui/core";
import PasswordInput from "../../shared/components/forms/PasswordInput";

const RegisterPage: FC = () => {
    const [loading, setLoading] = useState(false);

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const usersState = useAppSelector(state => state.users);
    const dispatch = useAppDispatch();

    // Register
    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword){

        }
    };

    return <>
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
        </UserFormPageContainer>
    </>
}

export default RegisterPage;