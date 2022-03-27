import {FC, useState} from "react";
import styled from "@emotion/styled";
import {themeSpacing} from "../../../../../../core/styles/GlobalStyles";
import {StyledAttribute} from "../../CharacterStatsStyles";
import {IconButton, Radio, Typography} from "@mui/material";
import deathSaveSuccessesIcon from "../../../../../../../assets/images/icons/deathsavesuccesses.png";
import {Delete, RadioButtonChecked, RadioButtonUnchecked} from "@mui/icons-material";
import deathSaveFailuresIcon from "../../../../../../../assets/images/icons/deathsavefailures.png";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";
import {setCurrentEditCharacter} from "../../../../../../../redux/slices/characterSlice";
import restoreIcon from "../../../../../../../assets/images/windowbar/restore.png";

const StyledDeathSavesAndFailures = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${themeSpacing(2)};
`

const StyledDeathSavesAndFailuresRadio = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
`

const StyledAttributeLogo = styled.img`
  width: 32px;
  height: 32px;
`

interface CharacterStatsEditAttributeDeathSavesProps {
    deathSaveSuccesses: number;
    deathSaveFailures: number;
}

const CharacterStatsEditAttributeDeathSaves: FC<CharacterStatsEditAttributeDeathSavesProps> = ({deathSaveSuccesses, deathSaveFailures}) => {
    const dispatch = useAppDispatch();
    const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);
    const [deathSaveSuccessesState, setDeathSaveSuccessesState] = useState(deathSaveSuccesses);
    const [deathSaveFailuresState, setDeathSaveFailuresState] = useState(deathSaveFailures);

    /**
     * Update a character attribute.
     * @param value New value for the attribute.
     * @param attributeId
     */
    const changeAttribute = (value: number, attributeId: string) => {
        if(attributeId === "deathSaveSuccesses") {
            setDeathSaveSuccessesState(value);
        } else if(attributeId === "deathSaveFailures") {
            setDeathSaveFailuresState(value);
        }
        if(!!currentEditCharacter) {
            dispatch(setCurrentEditCharacter(({
                ...currentEditCharacter,
                attributes: [
                    ...currentEditCharacter.attributes?.map(a => {
                        return a.id === attributeId
                            ? {
                                ...a,
                                currentValue: value
                            } : a
                    }) ?? [],
                ]
            })))
        }
    }

    return <StyledAttribute columnSpan={2}>
        <StyledDeathSavesAndFailures>
            <div>
                <Typography align={"center"} variant={"subtitle1"}>Death save successes</Typography>
                <StyledDeathSavesAndFailuresRadio>
                    <StyledAttributeLogo src={deathSaveSuccessesIcon}/>
                    <CharacterStatsEditAttributeDeathSavesRadioGroup value={deathSaveSuccessesState} setValue={(e) => changeAttribute(e, "deathSaveSuccesses")} maxValue={3}/>
                </StyledDeathSavesAndFailuresRadio>
            </div>
            <div>
                <Typography align={"center"} variant={"subtitle1"}>Death save failures</Typography>
                <StyledDeathSavesAndFailuresRadio>
                    <StyledAttributeLogo src={deathSaveFailuresIcon}/>
                    <CharacterStatsEditAttributeDeathSavesRadioGroup value={deathSaveFailuresState} setValue={(e) => changeAttribute(e, "deathSaveFailures")} maxValue={3}/>
                </StyledDeathSavesAndFailuresRadio>
            </div>
        </StyledDeathSavesAndFailures>
    </StyledAttribute>
}

/**
 * This will display a radio group for the death saves and failures.
 * @param value Value to display. i.e. value of 2 means 2 checkboxes will be ticked.
 * @param setValue Function to set the value.
 * @param maxValue Number of total checkboxes.
 * @constructor
 */
const CharacterStatsEditAttributeDeathSavesRadioGroup: FC<{value: number, setValue: (value: number) => void, maxValue: number}> = ({value, setValue, maxValue}) => {
    return <>
        {[...Array(maxValue)].map((x, i) =>
            {
                const currentValue = i + 1;
                return <Radio
                    key={currentValue}
                    checkedIcon={<RadioButtonChecked/>}
                    icon={<RadioButtonUnchecked/>}
                    checked={currentValue <= value}
                    onClick={() => setValue(currentValue)}
                />
            }
        )}
        {/** Clears the input for death saves. */}
        <IconButton onClick={() => setValue(0)}>
            <Delete/>
        </IconButton>
    </>
}

export default CharacterStatsEditAttributeDeathSaves;
