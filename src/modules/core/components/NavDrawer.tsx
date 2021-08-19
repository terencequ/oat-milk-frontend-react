import React, {CSSProperties, FC, ReactElement} from 'react';
import {Divider, Drawer, IconButton, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import ListAltIcon from "@material-ui/icons/ListAlt";
import LogoDense from "../../shared/components/LogoDense";
import {useHistory} from "react-router-dom";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";


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
  margin-left: 0.3rem;
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
  {
    path: "/create",
    title: "New Character",
    icon: <AddIcon/>
  }
];



interface NavDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  drawerWidth: number;
}

const NavDrawer: FC<NavDrawerProps> = ({open, setOpen, anchor, drawerWidth}) => {
  const history = useHistory();

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleNavigate = (path: string) => {
    return () => {
      history.push(path);
    };
  };

  return <Drawer variant={"persistent"} open={open} anchor={anchor} onClose={onClose}>
      <div style={{width: drawerWidth+"px"}}>
        <DrawerHeader>
          <DrawerHeaderLogo><LogoDense style={{minHeight: "64px"}}/></DrawerHeaderLogo>

            {
              open
                ? <IconButton onClick={onClose}><ChevronLeft/></IconButton>
                : <IconButton onClick={onOpen}><ChevronRight/></IconButton>
            }

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























