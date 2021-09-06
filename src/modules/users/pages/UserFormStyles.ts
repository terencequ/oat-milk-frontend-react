import styled from "@emotion/styled";
import {CircularProgress} from "@material-ui/core";

export const UserFormPageContainer = styled.div`
  width: 450px;
  max-width: 95vw;

  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 6vw auto auto;

  .logo {
    display: flex;
    align-items: center;
    flex-flow: column;
    margin: 3vh auto;
  }
  
  form {
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: auto;
  }
`;

export const CenteredCircularProgress = styled(CircularProgress)`
  margin: auto;
`