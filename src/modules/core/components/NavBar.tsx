import React, {FC, MouseEvent, useState} from 'react';
import {AppBar, IconButton, Menu, MenuItem, Theme, Toolbar} from "@material-ui/core";
import styled from "@emotion/styled";

import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import NavDrawer from "./NavDrawer";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import LogoDense from "../../shared/components/LogoDense";
import {useLocation} from "react-router-dom";
import MenuItemThemeButton from "../../shared/components/MenuItemThemeButton";
import {logout} from "../../../redux/slices/usersSlice";
import {themeSpacing} from "../styles/GlobalStyles";

const StyledAppBar = styled(AppBar)<{isLeftDrawerOpen: boolean}>`
  width: 100vw;
  transition: ${props => {
    const theme = props.theme as Theme;
    return props.isLeftDrawerOpen ?
        theme.transitions.create(['margin', 'width'], { // Enter screen animation
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        })
        :
        theme.transitions.create(['margin', 'width'], { // Exit screen animation
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        })
  }}
`

const StyledSettingsWrap = styled.div`
  margin-left: auto;
  margin-right: ${themeSpacing(2)};
`;

const StyledListItemIcon = styled.div`
  margin-right: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavBar: FC = () => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsAnchor, setSettingsAnchor] = useState<Element | undefined>(undefined);

  const authToken = useAppSelector(state => state.users.authToken);
  const isLoggedIn = authToken !== undefined && authToken !== null;

  const dispatch = useAppDispatch();

  const handleToggleLeftDrawer = (e: MouseEvent<HTMLButtonElement>) => {
    setLeftDrawerOpen(!leftDrawerOpen);
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
    return <></>
  }

  const drawerWidth = 350;
  return <>
    <StyledAppBar position="sticky" sx={{
      width: { sm: `calc(100% - ${leftDrawerOpen ? drawerWidth : 0}px)` },
      ml: { sm: `${leftDrawerOpen ? drawerWidth : 0}px` },
    }} isLeftDrawerOpen={leftDrawerOpen}>
      <Toolbar>
        <IconButton onClick={handleToggleLeftDrawer}>
          {leftDrawerOpen ? <MenuOpenIcon/> : <MenuIcon/>}
        </IconButton>
        <StyledSettingsWrap>
          <IconButton onClick={handleOpenSettings}><SettingsIcon/></IconButton>
          <Menu open={settingsOpen} anchorEl={settingsAnchor} onClose={handleCloseSettings}>
            <MenuItemThemeButton/>
            {isLoggedIn && <MenuItem onClick={handleLogout}><StyledListItemIcon><ExitToAppIcon/></StyledListItemIcon>Log out</MenuItem>}
          </Menu>
        </StyledSettingsWrap>
      </Toolbar>
    </StyledAppBar>
    <NavDrawer open={leftDrawerOpen} setOpen={setLeftDrawerOpen} drawerWidth={drawerWidth}/>
  </>;
}

export default NavBar;