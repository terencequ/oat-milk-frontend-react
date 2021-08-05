import React from 'react';
import {Drawer, Link} from "@material-ui/core";
import styled from "@emotion/styled";
import NavBar from "./navbar/NavBar";

interface GenericDrawerProps {
  open: boolean;
  setOpen: (a: boolean) => void;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  style?: React.CSSProperties;
}


const StyledDrawerContents = styled.div`
  width: 25vw;
  max-width: 25vw;
`;

const GenericDrawer = (p: GenericDrawerProps) => {
  const {open, setOpen, anchor, style} = p;

  const onClose = () => {
    setOpen(false);
  };

  return <>
    <Drawer open={open} anchor={anchor} onClose={onClose} style={style}>
      <StyledDrawerContents>
        <NavBar dense={true}/>
        <Link href={"/"} underline={"none"}>Home</Link>
      </StyledDrawerContents>
    </Drawer>
  </>;
}

export default GenericDrawer;