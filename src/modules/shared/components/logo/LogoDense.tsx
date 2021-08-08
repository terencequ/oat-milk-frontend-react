import {Typography} from "@material-ui/core";
import React, {CSSProperties, FC} from "react";
import styled from "@emotion/styled";

const StyledLogoDenseWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled.img`
  max-height: 32px;
  max-width: 32px;
`;

const StyledLogoText = styled(Typography)`
  font-family: "Josefin Slab", "Roboto", "Helvetica", "Arial", sans-serif;
  padding-top: 0.2rem;
`;

const LogoDense: FC<{style?: CSSProperties}> = ({style}) => {

  return <StyledLogoDenseWrap style={style}>
    <StyledLogo src={'/logo-128px.png'}/>
    <StyledLogoText variant={"h6"}>Oat Milk</StyledLogoText>
  </StyledLogoDenseWrap>;
};


export default LogoDense;