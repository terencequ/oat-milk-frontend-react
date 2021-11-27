import styled from "@emotion/styled";
import {Card, CardProps} from "@mui/material";
import {themeSpacing} from "../../../../core/styles/GlobalStyles";
import {FC} from "react";

export const StyledDescriptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${themeSpacing(1)};
  grid-template-rows: 170px 170px 170px 400px;
  grid-row-gap: ${themeSpacing(1)};
`;


interface WrappedCardProps extends CardProps {
    columnSpan?: number
}

const WrappedCard: FC<WrappedCardProps> = ({columnSpan, ...props}) => {
    return <Card {...props}>{props.children}</Card>
}
export const StyledDescription = styled(WrappedCard)<{ columnSpan?: number }>`
  grid-column: span ${props => props.columnSpan ?? 1};
  padding: ${themeSpacing(2)};
`
