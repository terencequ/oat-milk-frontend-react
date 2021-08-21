import React, {FC, ReactElement} from 'react';
import {Divider, Drawer, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from "@material-ui/icons/ListAlt";
import LogoDense from "../../shared/components/LogoDense";
import {useHistory} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {setDrawerOpen} from "../../../redux/slices/userInterfaceSlice";

export const drawerWidth = 300;

const DrawerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto 0.75rem;
`

const DrawerHeaderLogo = styled.div`
  margin-right: auto;

`

const StyledListItemText = styled(ListItemText)`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: left;
`;

const StyledTypography = styled(Typography)`
  margin-left: 2rem;
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
  const drawerOpen = useAppSelector(state => state.userInterface.drawerOpen);

  const onToggleOpen = () => {
    dispatch(setDrawerOpen(!drawerOpen));
  };

  const handleNavigate = (path: string) => {
    return () => {
      history.push(path);
      onToggleOpen();
    };
  };

  return <Drawer variant={"temporary"} open={drawerOpen} anchor={anchor} onClose={onToggleOpen}>
      <div style={{width: drawerWidth+"px"}}>
        <DrawerHeader>
          <DrawerHeaderLogo><LogoDense style={{minHeight: "64px"}}/></DrawerHeaderLogo>
        </DrawerHeader>
        <Divider/>
        <List>
          {drawerButtons.map((value, i) => {
            return (
              <ListItem button={true} key={i} onClick={handleNavigate(value.path)} >
                <StyledListItemText disableTypography={true}>
                  {value.icon}
                  <StyledTypography variant={"body1"}>{value.title}</StyledTypography>
                </StyledListItemText>
              </ListItem>
            );
            })}
        </List>
      </div>
    </Drawer>;
}

export default NavDrawer;























