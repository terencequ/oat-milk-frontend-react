import React, {useState} from 'react';
import {AppBar, IconButton, Theme, Toolbar} from "@material-ui/core";
import styled from "@emotion/styled";
import MenuIcon from '@material-ui/icons/Menu';
import {MenuOpen} from "@material-ui/icons";
import GenericDrawer from "../GenericDrawer";


interface NavBarProps {
  dense?: boolean;
}

type StyledNavBar = {
  dense?: boolean;
};


const StyledAppBar = styled(AppBar)<StyledNavBar>`
  background-color: ${p => {
    const thm = p.theme as Theme;
    return thm.palette.primary.main;
  }};
  position: ${p => {
    const dense = p.dense as boolean;
    return dense ? "relative" : "sticky";
  }};
`;


const NavBar = (p: NavBarProps) => {
  const {dense} = p;

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);

  if (dense)
  {
    return <>
      <StyledAppBar dense={dense}>
        <Toolbar>
          Test
        </Toolbar>
      </StyledAppBar>
    </>;
  }

  return <>
    <StyledAppBar dense={dense}>
      <Toolbar>

        <IconButton onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}>
          {leftDrawerOpen ? <MenuOpen/> : <MenuIcon/>}
        </IconButton>

      </Toolbar>
    </StyledAppBar>

    <GenericDrawer open={leftDrawerOpen} setOpen={setLeftDrawerOpen}/>
  </>;
}

export default NavBar;