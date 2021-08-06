import React, {CSSProperties, FC, ReactElement} from 'react';
import {Divider, Drawer, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import HomeIcon from '@material-ui/icons/Home';
import LogoDense from "./logo/LogoDense";


const StyledDrawerContents = styled.div`
  width: 15vw;
  max-width: 15vw;
`;


const StyledListItemText = styled(ListItemText)`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: left;
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
  }
];


interface GenericDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  style?: CSSProperties;
}

const GenericDrawer: FC<GenericDrawerProps> = p => {
  const {open, setOpen, anchor, style} = p;

  const onClose = () => {
    setOpen(false);
  };

  const handleNavigate = (path: string) => {
    return () => {
      window.location.href = path;
    };
  };

  return <>
    <Drawer open={open} anchor={anchor} onClose={onClose} style={style}>
      <StyledDrawerContents>

        <LogoDense style={{minHeight: "64px"}}/>
        <Divider/>

        <List>
          {drawerButtons.map((value, i) => {
            return (
              <ListItem button={true} key={i}>
                <StyledListItemText onClick={handleNavigate(value.path)}>
                  {value.icon}
                  {value.title}
                </StyledListItemText>
              </ListItem>
            );
            })}
        </List>
      </StyledDrawerContents>
    </Drawer>
  </>;
}

export default GenericDrawer;























