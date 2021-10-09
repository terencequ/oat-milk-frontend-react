import styled from "@emotion/styled";
import {Card, Theme} from "@material-ui/core";

// helper function factory to get theme spacing
export const themeSpacing = (amount: number) => (props: any) => {
    const theme = props.theme as Theme;
    return theme.spacing(amount);
}

export const BottomMiddleFixedCard = styled(Card)`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const PageContainer = styled.div`
  margin: auto;
  width: 100%;
  padding: ${themeSpacing(8)};
  overflow-y: scroll;
  max-height: calc(100vh - 90px);
`

export const HeroContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`