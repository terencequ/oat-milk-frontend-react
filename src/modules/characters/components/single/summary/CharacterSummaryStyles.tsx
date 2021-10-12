import styled from "@emotion/styled";
import {themeSpacing} from "../../../../core/styles/GlobalStyles";

export const StyledSummary = styled.div`
  display: grid;
  grid-template-rows: 80px 60px;
  grid-row-gap: ${themeSpacing(1)};
  text-align: center;
  justify-content: center;
  align-items: center;
`