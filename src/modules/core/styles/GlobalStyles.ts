import styled from "@emotion/styled";
import {Theme} from "@material-ui/core";

// helper function factory to get theme spacing
export const themeSpacing = (amount: number) => (props: any) => {
    const theme = props.theme as Theme;
    return theme.spacing(amount);
}

export const BottomMiddleFixedDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const PageContainer = styled.div`
  margin: 2vw auto;
  max-width: 960px;

`

export const HeroContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`