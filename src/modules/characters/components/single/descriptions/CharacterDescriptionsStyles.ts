import styled from "@emotion/styled";
import {Card} from "@mui/material";
import {themeSpacing} from "../../../../core/styles/GlobalStyles";

export const StyledDescriptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${themeSpacing(1)};
  grid-template-rows: 170px 170px 170px 400px;
  grid-row-gap: ${themeSpacing(1)};
`;

export const StyledDescription = styled(Card)`
  padding: ${themeSpacing(2)};
`