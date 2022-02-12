import styled from "@emotion/styled";
import {Card, CircularProgress, FormControl} from "@mui/material";
import {themeSpacing} from "../../core/styles/GlobalStyles";

export const UserFormPageContainer = styled(Card)`
  width: 480px;
  max-width: 95vw;

  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: auto;
  margin-top: ${themeSpacing(2)};
  padding: ${themeSpacing(4)};

  .logo {
    display: flex;
    align-items: center;
    flex-flow: column;
    margin: auto;
  }
  
  form {
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: auto;
  }
`;

export const UserFormSubmitButton = styled(FormControl)`
  margin-bottom: ${themeSpacing(4)}
`

export const CenteredCircularProgress = styled(CircularProgress)`
  margin: auto;
`
