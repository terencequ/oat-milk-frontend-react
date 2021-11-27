import styled from "@emotion/styled";
import {Typography} from "@mui/material";
import {RadioButtonChecked, RadioButtonUnchecked} from "@mui/icons-material";
import {FC} from "react";
import {themeSpacing} from "../../../../../../core/styles/GlobalStyles";
import deathSaveFailuresIcon from 'assets/images/icons/deathsavefailures.png';
import deathSaveSuccessesIcon from 'assets/images/icons/deathsavesuccesses.png';
import {StyledAttribute} from "../../CharacterStatsStyles";

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
const CharacterStatsViewAttributesDeathSaves: FC<CharacterStatsViewDeathSavesProps> = ({deathSaveSuccesses, deathSaveFailures}) => {
    return <StyledAttribute columnSpan={2}>
        <StyledDeathSavesAndFailures>
            <div>
                <Typography align={"center"} variant={"subtitle1"}>Death save successes</Typography>
                <StyledDeathSavesAndFailuresRadio>
                    <StyledAttributeLogo src={deathSaveSuccessesIcon}/>
                    {[...Array(deathSaveSuccesses)].map((value, index) => <RadioButtonChecked key={index}/>)}
                    {[...Array(3 - deathSaveSuccesses)].map((value, index) => <RadioButtonUnchecked key={index}/>)}
                </StyledDeathSavesAndFailuresRadio>
            </div>
            <div>
                <Typography align={"center"} variant={"subtitle1"}>Death save failures</Typography>
                <StyledDeathSavesAndFailuresRadio>
                    <StyledAttributeLogo src={deathSaveFailuresIcon}/>
                    {[...Array(deathSaveFailures)].map((value, index) => <RadioButtonChecked key={index}/>)}
                    {[...Array(3 - deathSaveFailures)].map((value, index) => <RadioButtonUnchecked key={index}/>)}
                </StyledDeathSavesAndFailuresRadio>
            </div>
        </StyledDeathSavesAndFailures>
    </StyledAttribute>
}

export default CharacterStatsViewAttributesDeathSaves;
