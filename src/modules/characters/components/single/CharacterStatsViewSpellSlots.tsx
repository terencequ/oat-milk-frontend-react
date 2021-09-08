import styled from "@emotion/styled";
import {Typography} from "@material-ui/core";
import {RadioButtonUnchecked} from "@material-ui/icons";
import {FC} from "react";
import {themeSpacing} from "../../../core/styles/GlobalStyles";

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: ${themeSpacing(4)};
  grid-template-rows: 1fr 1fr 1fr;
  grid-row-gap: ${themeSpacing(4)};
  align-items: center;
  justify-content: center;
`

const StyledSpellSlotIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CharacterStatsViewSpellSlots: FC = () => {
    return <>
        <Typography variant={"subtitle1"} gutterBottom>Spell Slots</Typography>
        <StyledContainer>
            <div>
                <Typography align={"center"}>Level 1</Typography>
                <StyledSpellSlotIcons>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                </StyledSpellSlotIcons>
            </div>
            <div>
                <Typography align={"center"}>Level 2</Typography>
                <StyledSpellSlotIcons>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                </StyledSpellSlotIcons>
            </div>
            <div>
                <Typography align={"center"}>Level 3</Typography>
                <StyledSpellSlotIcons>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                </StyledSpellSlotIcons>
            </div>
            <div>
                <Typography align={"center"}>Level 4</Typography>
                <StyledSpellSlotIcons>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                </StyledSpellSlotIcons>
            </div>
            <div>
                <Typography align={"center"}>Level 5</Typography>
                <StyledSpellSlotIcons>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                </StyledSpellSlotIcons>
            </div>
            <div>
                <Typography align={"center"}>Level 6</Typography>
                <StyledSpellSlotIcons>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                </StyledSpellSlotIcons>
            </div>
            <div>
                <Typography align={"center"}>Level 7</Typography>
                <StyledSpellSlotIcons>
                    <RadioButtonUnchecked/>
                    <RadioButtonUnchecked/>
                </StyledSpellSlotIcons>
            </div>
            <div>
                <Typography align={"center"}>Level 8</Typography>
                <StyledSpellSlotIcons>
                    <RadioButtonUnchecked/>
                </StyledSpellSlotIcons>
            </div>
            <div>
                <Typography align={"center"}>Level 9</Typography>
                <StyledSpellSlotIcons>
                    <RadioButtonUnchecked/>
                </StyledSpellSlotIcons>
            </div>
        </StyledContainer>
    </>
}

export default CharacterStatsViewSpellSlots;