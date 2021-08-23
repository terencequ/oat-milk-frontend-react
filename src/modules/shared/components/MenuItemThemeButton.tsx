import React, {FC} from 'react';
import styled from "@emotion/styled";

import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {setDarkMode} from "../../../redux/slices/userInterfaceSlice";
import {MenuItem} from "@material-ui/core";

const StyledListItemIcon = styled.div`
  margin-right: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * This button allows the users to switch from dark mode to light mode and vice versa.
 * @constructor
 */
const MenuItemThemeButton: FC = () => {
    const darkMode = useAppSelector(state => state.userInterface.darkMode);
    const dispatch = useAppDispatch();

    const handleToggleTheme = () => {
        dispatch(setDarkMode(!darkMode));
    };

    return <MenuItem onClick={handleToggleTheme}>
        <StyledListItemIcon onClick={handleToggleTheme}>
            {darkMode ? <Brightness7Icon/> : <Brightness4Icon/>}
        </StyledListItemIcon>
        {darkMode ? "Light" : "Dark"} Mode
    </MenuItem>
}

export default MenuItemThemeButton;