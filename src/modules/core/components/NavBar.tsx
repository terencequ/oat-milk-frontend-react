import React, {FC, MouseEvent, useState} from 'react';
import {AppBar, IconButton, Menu, MenuItem, Toolbar} from "@material-ui/core";
import styled from "@emotion/styled";

import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import NavDrawer from "./NavDrawer";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import LogoDense from "../../shared/components/logo/LogoDense";
import {useLocation} from "react-router-dom";
import MenuItemThemeButton from "../../shared/components/theme/MenuItemThemeButton";
import {logout} from "../../../redux/slices/usersSlice";

const StyledAppBar = styled(AppBar)<any>`
  position: ${p => {
    const dense = p.dense as boolean;
    return dense ? "relative" : "sticky";
  }};
`;

const StyledLogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1vw;
`;

const StyledSettingsWrap = styled.div`
  margin-left: auto;
`;

const StyledListItemIcon = styled.div`
  margin-right: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface NavBarProps {
  dense?: boolean;
}

const NavBar: FC<NavBarProps> = (p) => {
  const {dense} = p;

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

  return <>
    <StyledAppBar dense={dense}>
      <Toolbar>

        {isLoggedIn
          ? <IconButton onClick={handleToggleLeftDrawer}>
              {leftDrawerOpen ? <MenuOpenIcon/> : <MenuIcon/>}
            </IconButton>
          : null}

        <StyledLogoWrap>
          <LogoDense/>
        </StyledLogoWrap>

        <StyledSettingsWrap>
          <IconButton onClick={handleOpenSettings}><SettingsIcon/></IconButton>
          <Menu open={settingsOpen} anchorEl={settingsAnchor} onClose={handleCloseSettings}>
            <MenuItemThemeButton/>
            {isLoggedIn && <MenuItem onClick={handleLogout}><StyledListItemIcon><ExitToAppIcon/></StyledListItemIcon>Log out</MenuItem>}
          </Menu>
        </StyledSettingsWrap>

      </Toolbar>
    </StyledAppBar>
    <NavDrawer open={leftDrawerOpen} setOpen={setLeftDrawerOpen}/>
  </>;
}

export default NavBar;