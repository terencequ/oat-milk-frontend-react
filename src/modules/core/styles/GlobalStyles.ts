import styled from "@emotion/styled";
import {Card, Theme} from "@mui/material";

// helper function factory to get theme spacing
export const themeSpacing = (amount: number) => (props: any) => {
    const theme = props.theme as Theme;
    return theme.spacing(amount);
}

export const StyledBottomMiddleFixedCard = styled(Card)`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const StyledPageContainer = styled.div`
  margin: auto;
  padding: ${themeSpacing(8)};
  overflow-y: auto;
  max-height: calc(100vh - 90px);
`

export const StyledFloatingAction = styled.div`
  position: absolute;
  right: 4%;
  bottom: 4%;
  z-index: 1;
`