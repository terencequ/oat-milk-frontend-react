import {FilledInput, IconButton, InputAdornment, InputLabel} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, {ChangeEvent, FC, useState} from "react";

interface PasswordInputProps {
    password: string;
    setPassword: (event: string) => void;
    label: string;
}

/**
 * Component for hideable password field.
 * @param props
 * @constructor
 */
const PasswordInput: FC<PasswordInputProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        props.setPassword(value);
    };

    return <>
        <InputLabel htmlFor={"filled-adornment-password"}>{props.label}</InputLabel>
        <FilledInput id={"filled-adornment-password"}
                     type={showPassword ? "text" : "password"}
                     onChange={handlePasswordChange}
                     value={props.password}
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
    </>
}

export default PasswordInput;