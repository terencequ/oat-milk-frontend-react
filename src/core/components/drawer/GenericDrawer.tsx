import React, {CSSProperties, FC, ReactElement} from 'react';
import {Divider, Drawer, Link, List, ListItem, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import HomeIcon from '@material-ui/icons/Home';



const StyledDrawerContents = styled.div`
  width: 15vw;
  max-width: 15vw;
`;

const StyledTypography = styled(Typography)`
  width: 100%;
  min-height: 64px;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: left;
`;


interface DrawerButton {
  link: string;
  title: string;
  icon: ReactElement;
}

const drawerButtons: DrawerButton[] = [
  {
    link: "/",
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

  return <>
    <Drawer open={open} anchor={anchor} onClose={onClose} style={style}>
      <StyledDrawerContents>

        <StyledTypography variant={"h5"}>Oat Milk</StyledTypography>
        <Divider/>

        <List>
          {drawerButtons.map((value, i) => {
            return <>
              <ListItem button={true} key={i}>
                <StyledLink href={value.link} underline={"none"}>
                  {value.icon}
                  {value.title}
                </StyledLink>
              </ListItem>
            </>;
            })}
        </List>
      </StyledDrawerContents>
    </Drawer>
  </>;
}

export default GenericDrawer;























