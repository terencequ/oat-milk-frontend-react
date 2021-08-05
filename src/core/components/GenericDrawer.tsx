import React from 'react';
import {Drawer, Link, Typography} from "@material-ui/core";
import styled from "@emotion/styled";

interface GenericDrawerProps {
  open: boolean;
  setOpen: (a: boolean) => void;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  style?: React.CSSProperties;
}


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


const GenericDrawer = (p: GenericDrawerProps) => {
  const {open, setOpen, anchor, style} = p;

  const onClose = () => {
    setOpen(false);
  };

  return <>
    <Drawer open={open} anchor={anchor} onClose={onClose} style={style}>
      <StyledDrawerContents>

        <StyledTypography variant={"h4"}>Oat Milk</StyledTypography>

        <Link href={"/"} underline={"none"}>Home</Link>
      </StyledDrawerContents>
    </Drawer>
  </>;
}

export default GenericDrawer;