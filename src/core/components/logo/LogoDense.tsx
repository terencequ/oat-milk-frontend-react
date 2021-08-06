import {Typography} from "@material-ui/core";
import React, {FC} from "react";
import styled from "@emotion/styled";
import logoIcon128 from "../../../assets/logo-128px.png";


const StyledLogo = styled.img`
  max-height: 32px;
  max-width: 32px;
`;

const StyledLogoText = styled(Typography)`
  font-family: "Josefin Slab", "Roboto", "Helvetica", "Arial", sans-serif;
  padding-top: 0.2rem;
`;

const LogoDense: FC = () => {

  return <>
    <StyledLogo src={logoIcon128}/>
    <StyledLogoText variant={"h6"}>Oat Milk</StyledLogoText>
  </>;
};


export default LogoDense;