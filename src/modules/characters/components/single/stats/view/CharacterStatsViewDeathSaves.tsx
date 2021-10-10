import styled from "@emotion/styled";
import {Paper, Typography} from "@mui/material";
import {RadioButtonChecked, RadioButtonUnchecked} from "@mui/icons-material";
import {FC} from "react";
import {themeSpacing} from "../../../../../core/styles/GlobalStyles";
import deathSaveFailuresIcon from 'assets/images/icons/deathsavefailures.png';
import deathSaveSuccessesIcon from 'assets/images/icons/deathsavesuccesses.png';

const StyledDeathSavesAndFailures = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${themeSpacing(2)};
`

const StyledDeathSavesAndFailuresRadio = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: auto;
`

const StyledAttributeLogo = styled.img`
  width: 32px;
  height: 32px;
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
                <StyledAttributeLogo src={deathSaveSuccessesIcon}/>
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
                <StyledAttributeLogo src={deathSaveFailuresIcon}/>
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