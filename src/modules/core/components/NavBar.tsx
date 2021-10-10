import React, {FC, MouseEvent, useState} from 'react';
import {AppBar, IconButton, LinearProgress, Menu, MenuItem, Toolbar} from "@mui/material";
import styled from "@emotion/styled";

import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useLocation} from "react-router-dom";
import MenuItemThemeButton from "../../shared/components/MenuItemThemeButton";
import {logout} from "../../../redux/slices/usersSlice";
import {isElectron} from "../../shared/helpers/ElectronHelpers";
import {themeSpacing} from "../styles/GlobalStyles";
import {setDrawerMinimised} from "../../../redux/slices/userInterfaceSlice";
import LogoDense from "../../shared/components/LogoDense";
import WindowBar from "./WindowBar";

const StyledAppBar = styled(AppBar)`
  width: 100vw;
`

const StyledToolbar = styled(Toolbar)`
  padding: 0 ${themeSpacing(2)};
`

const StyledSettingsWrap = styled.div`
  margin-left: auto;
`;

const StyledListItemIcon = styled.div`
  margin-right: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLinearProgress = styled(LinearProgress)`
  position: absolute;
  width: 100vw;
  bottom: -0px;
`

const NavBar: FC = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsAnchor, setSettingsAnchor] = useState<Element | undefined>(undefined);

  const authToken = useAppSelector(state => state.users.authToken);
  const isLoggedIn = authToken !== undefined && authToken !== null;

  const dispatch = useAppDispatch();
  const {drawerMinimised, isLoading} = useAppSelector(state => state.userInterface);

  const handleToggleLeftDrawer = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(setDrawerMinimised(!drawerMinimised));
  };

  const handleOpenSettings = (e: MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchor(e.currentTarget);
    setSettingsOpen(true);
  };

  const handleCloseSettings = (e: MouseEvent<HTMLButtonElement>) => {
    setSettingsOpen(false);
  };

  const handleLogout = () => {
    setSettingsOpen(false);
    dispatch(logout());
  };

  // No app bar if this is the login page
  const location = useLocation();
  if(location.pathname === '/login' || location.pathname === '/register') {
    return <>{isElectron() && <WindowBar/>}</>
  }

  return <StyledAppBar sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} position="sticky">
      {isElectron() && <WindowBar/>}
      <StyledToolbar disableGutters>
        <IconButton onClick={handleToggleLeftDrawer}>
          <MenuIcon/>
        </IconButton>
        <LogoDense style={{marginLeft: "10px"}}/>
        <StyledSettingsWrap>
          <IconButton onClick={handleOpenSettings}><SettingsIcon/></IconButton>
          <Menu open={settingsOpen} anchorEl={settingsAnchor} onClose={handleCloseSettings}>
            <MenuItemThemeButton/>
            {isLoggedIn && <MenuItem onClick={handleLogout}><StyledListItemIcon><ExitToAppIcon/></StyledListItemIcon>Log out</MenuItem>}
          </Menu>
        </StyledSettingsWrap>
      </StyledToolbar>
      {isLoading && <StyledLinearProgress color={"secondary"} variant={"indeterminate"}/>}
    </StyledAppBar>;
}

export default NavBar;