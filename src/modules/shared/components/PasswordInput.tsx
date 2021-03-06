import {IconButton, InputAdornment, TextField} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
        <TextField id={"filled-adornment-password"}
                     size="small"
                     type={showPassword ? "text" : "password"}
                     onChange={handlePasswordChange}
                     value={props.password}
                     required
                     label={props.label}
                     variant={"filled"}
                     InputProps={{
                         endAdornment: (
                             <InputAdornment position={"end"}>
                                 <IconButton
                                 onClick={handleShowPassword}
                                 >
                                     {showPassword ? <Visibility /> : <VisibilityOff />}
                                 </IconButton>
                             </InputAdornment>
                         )
                     }}
        />
    </>
}

export default PasswordInput;
