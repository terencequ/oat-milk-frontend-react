import styled from "@emotion/styled";
import {Typography} from "@material-ui/core";
import {RadioButtonChecked, RadioButtonUnchecked} from "@material-ui/icons";
import {FC} from "react";
import {themeSpacing} from "../../../core/styles/GlobalStyles";

const StyledDeathSavesAndFailures = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${themeSpacing(2)};
`

const StyledDeathSavesAndFailuresRadio = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  margin: auto;
`

interface CharacterStatsViewDeathSavesProps {
    deathSaveSuccesses: number,
    deathSaveFailures: number
}

/**
 * Displays death save successes and failures.
 */
const CharacterStatsViewDeathSaves: FC<CharacterStatsViewDeathSavesProps> = ({deathSaveSuccesses, deathSaveFailures}) => {
    return <StyledDeathSavesAndFailures>
        <div>
            <Typography align={"center"} variant={"subtitle1"}>Death save successes</Typography>
            <StyledDeathSavesAndFailuresRadio>
                {[...Array(deathSaveSuccesses)].map((value, index) => <>
                    <RadioButtonChecked/>
                </>)}
                {[...Array(3 - deathSaveSuccesses)].map((value, index) => <>
                    <RadioButtonUnchecked/>
                </>)}
            </StyledDeathSavesAndFailuresRadio>
        </div>
        <div>
            <Typography align={"center"} variant={"subtitle1"}>Death save failures</Typography>
            <StyledDeathSavesAndFailuresRadio>
                {[...Array(deathSaveFailures)].map(() => <>
                    <RadioButtonChecked/>
                </>)}
                {[...Array(3 - deathSaveFailures)].map(() => <>
                    <RadioButtonUnchecked/>
                </>)}
            </StyledDeathSavesAndFailuresRadio>
        </div>
    </StyledDeathSavesAndFailures>
}

export default CharacterStatsViewDeathSaves;