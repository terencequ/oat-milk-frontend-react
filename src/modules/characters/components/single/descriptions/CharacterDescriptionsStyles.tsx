import styled from "@emotion/styled";
import {Card, CardProps} from "@mui/material";
import {themeSpacing} from "../../../../core/styles/GlobalStyles";
import {FC} from "react";
import CharacterDescriptionsEdit from "./edit/CharacterDescriptionsEdit";
import CharacterDescriptionEdit from "./edit/CharacterDescriptionEdit";

export const StyledDescriptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${themeSpacing(1)};
  grid-template-rows: 170px 170px 170px auto;
  grid-row-gap: ${themeSpacing(1)};
`;


interface WrappedCardProps extends CardProps {
    columnSpan?: number,
    minHeight?: number
}
const WrappedCard: FC<WrappedCardProps> = ({columnSpan, minHeight, ...props}) => {
    return <Card {...props}>{props.children}</Card>
}
export const StyledDescription = styled(WrappedCard)<WrappedCardProps>`
  grid-column: span ${props => props.columnSpan ?? 1};
  padding: ${themeSpacing(2)};
  min-height: ${props => props.minHeight+"px" ?? "auto"};
`
