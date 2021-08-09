import React, {CSSProperties, FC, ReactElement} from 'react';
import {Divider, Drawer, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import LogoDense from "../logo/LogoDense";
import {useHistory} from "react-router-dom";



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
    path: "/create",
    title: "New Character",
    icon: <AddIcon/>
  }
];



interface GenericDrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  style?: CSSProperties;
}

const GenericDrawer: FC<GenericDrawerProps> = ({open, setOpen, anchor, style}) => {
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
  };

  const handleNavigate = (path: string) => {
    return () => {
      onClose();
      history.push(path);
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
              <ListItem button={true} key={i} onClick={handleNavigate(value.path)} >
                <StyledListItemText disableTypography={true}>
                  {value.icon}
                  <StyledTypography variant={"body1"}>{value.title}</StyledTypography>
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























