import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {CircularProgress, FormControl, Theme} from "@material-ui/core";

export const UserFormPageContainer = styled.div`
  width: 450px;
  max-width: 95vw;

  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 8vw auto auto;

  .logo {
    display: flex;
    align-items: center;
    flex-flow: column;
    margin: 3vh auto;
  }
  
  form {
    padding: 24px 24px 24px;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
`;

export const CenteredCircularProgress = styled(CircularProgress)`
  margin: auto;
`