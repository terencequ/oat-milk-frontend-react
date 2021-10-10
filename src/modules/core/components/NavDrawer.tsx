import React, {FC, ReactElement} from 'react';
import {Drawer, List, ListItem, ListItemText, Theme, Toolbar, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from "@material-ui/icons/ListAlt";
import {useHistory, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {setDrawerOpen} from "../../../redux/slices/userInterfaceSlice";
import {isElectron} from "../../shared/helpers/ElectronHelpers";
import {themeSpacing} from "../styles/GlobalStyles";
import {windowBarHeight} from "./WindowBar";

export const drawerWidth = 220;
export const drawerMinimisedWidth = 72;

const StyledSpacer = styled(Toolbar)`
  margin-top: ${isElectron() ? windowBarHeight : 0}px;
`

const StyledDrawerContents = styled.div`
  height: 100%;
  width: ${() => {
    const {drawerMinimised} = useAppSelector(state => state.userInterface);
    return (drawerMinimised ? drawerMinimisedWidth : drawerWidth) + "px";
  }};
  transition: ${props => {
    const theme = props.theme as Theme;
    return theme.transitions.create(['margin', 'width'], { // Enter screen animation
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    })
  }}
}

;
`

const StyledListItemText = styled(ListItemText)`
  margin: 0 ${themeSpacing(2)};
  padding: ${themeSpacing(0.5)} 8px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const StyledTypography = styled(Typography)`
  margin-left: 25px;
`;

interface DrawerButton {
  path: string;
  title: string;
  icon: ReactElement;
}

const drawerButtons: DrawerButton[] = [
  {
    path: "/",
    title: "Home",
    icon: <HomeIcon/>
  },
  {
    path: "/characters",
    title: "Characters",
    icon: <ListAltIcon/>
  },
];

interface NavDrawerProps {
  anchor?: 'left' | 'top' | 'right' | 'bottom';
}

const NavDrawer: FC<NavDrawerProps> = ({anchor}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const {drawerOpen, drawerMinimised} = useAppSelector(state => state.userInterface);

  const onToggleOpen = () => {
    dispatch(setDrawerOpen(!drawerOpen));
  };

  const handleNavigate = (path: string) => {
    return () => {
      history.push(path);
    };
  };

  // No app drawer if this is the login page
  const location = useLocation();
  if(location.pathname === '/login' || location.pathname === '/register') {
    return <></>
  }

  return <Drawer variant={"permanent"} open={drawerOpen} anchor={anchor} onClose={onToggleOpen}>
      <StyledDrawerContents>
        <StyledSpacer/> {/** Spacer, for App Bar height */}
        <List>
          {drawerButtons.map((value, i) => {
            return (
                <ListItem disableGutters button={true} key={i} onClick={handleNavigate(value.path)} >
                  <StyledListItemText disableTypography={true}>
                    {value.icon}
                    {!drawerMinimised && <StyledTypography variant={"body1"}>{value.title}</StyledTypography>}
                  </StyledListItemText>
                </ListItem>
            );
          })}
        </List>
      </StyledDrawerContents>
    </Drawer>;
}

export default NavDrawer;























