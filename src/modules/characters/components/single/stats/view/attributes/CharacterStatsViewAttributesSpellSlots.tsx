import styled from "@emotion/styled";
import {Typography} from "@mui/material";
import {RadioButtonUnchecked} from "@mui/icons-material";
import {FC} from "react";
import {themeSpacing} from "../../../../../../core/styles/GlobalStyles";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: ${themeSpacing(3)};
  align-items: center;
  justify-content: center;
`

const StyledSpellSlotIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const CharacterStatsViewAttributesSpellSlots: FC = () => {
    return <>
        <Typography variant={"subtitle1"} gutterBottom>Spell Slots</Typography>
        <StyledContainer>
            <StyledSpellSlotIcons>
                <Typography align={"center"}>1</Typography>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
            </StyledSpellSlotIcons>
            <StyledSpellSlotIcons>
                <Typography align={"center"}>2</Typography>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
            </StyledSpellSlotIcons>
            <StyledSpellSlotIcons>
                <Typography align={"center"}>3</Typography>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
            </StyledSpellSlotIcons>
            <StyledSpellSlotIcons>
                <Typography align={"center"}>4</Typography>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
            </StyledSpellSlotIcons>
            <StyledSpellSlotIcons>
                <Typography align={"center"}>5</Typography>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
            </StyledSpellSlotIcons>
            <StyledSpellSlotIcons>
                <Typography align={"center"}>6</Typography>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
            </StyledSpellSlotIcons>
            <StyledSpellSlotIcons>
                <Typography align={"center"}>7</Typography>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
            </StyledSpellSlotIcons>
            <StyledSpellSlotIcons>
                <Typography align={"center"}>8</Typography>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
            </StyledSpellSlotIcons>
            <StyledSpellSlotIcons>
                <Typography align={"center"}>9</Typography>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
                <RadioButtonUnchecked/>
            </StyledSpellSlotIcons>
        </StyledContainer>
    </>
}

export default CharacterStatsViewAttributesSpellSlots;