import React, {FC, MouseEvent, useState} from 'react';
import {AppBar, Divider, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core";
import styled from "@emotion/styled";

import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import GenericDrawer from "../drawer/GenericDrawer";
import logoIcon128 from "../../../assets/logo-128px.png";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {setDarkMode} from "../../../redux/reducers/darkModeSlice";
import {setAuth} from "../../../redux/reducers/authSlice";



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

const StyledLogo = styled.img`
  max-height: 32px;
  max-width: 32px;
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

  const darkMode = useAppSelector(state => state.darkMode.darkMode);
  const authToken = useAppSelector(state => state.auth.authToken);

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

  const handleToggleTheme = () => {
    dispatch(setDarkMode(!darkMode));
  };

  const handleLogout = () => {
    dispatch(setAuth(null));
  };


  return <>
    <StyledAppBar dense={dense}>
      <Toolbar>

        <IconButton onClick={handleToggleLeftDrawer}>
          {leftDrawerOpen ? <MenuOpenIcon/> : <MenuIcon/>}
        </IconButton>

        <StyledLogoWrap>
          <StyledLogo src={logoIcon128}/>
          <Typography variant={"h6"}>Oat Milk</Typography>
        </StyledLogoWrap>

        <StyledSettingsWrap>
          <IconButton onClick={handleOpenSettings}><SettingsIcon/></IconButton>
          <Menu open={settingsOpen} anchorEl={settingsAnchor} onClose={handleCloseSettings}>

            <MenuItem onClick={handleToggleTheme}>
              <StyledListItemIcon>
                {darkMode ? <Brightness7Icon/> : <Brightness4Icon/>}
              </StyledListItemIcon>
              {darkMode ? "Light" : "Dark"} Mode
            </MenuItem>

            {authToken && authToken
              ? <>
                <Divider/>
                <MenuItem onClick={handleLogout}>
                  <StyledListItemIcon>
                    <ExitToAppIcon/>
                  </StyledListItemIcon>
                  Log out
                </MenuItem>
              </>
              : null}
          </Menu>
        </StyledSettingsWrap>

      </Toolbar>
    </StyledAppBar>

    <GenericDrawer open={leftDrawerOpen} setOpen={setLeftDrawerOpen}/>
  </>;
}

export default NavBar;