import styled from "@emotion/styled";
import {RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined} from "@mui/icons-material";
import {Checkbox, Typography} from "@mui/material";
import {
    CharacterAbilityScoreProficiencyRequest,
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {ChangeEvent, FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";
import {setCurrentEditCharacter} from "../../../../../../../redux/slices/charactersSlice";
import {getModifier, getModifierAsString, getProficiencyBonus} from "../../../../../helpers/CharacterStatHelpers";
import {StyledProficiencyOrSavingThrow} from "../../CharacterStatsStyles";

const StyledCheckbox = styled(Checkbox)`
  padding: 0;
  justify-content: flex-start;
  width: fit-content;
`

interface CharacterStatsEditAbilityScoreProficiencyProps {
    abilityScoreProficiency: CharacterAbilityScoreProficiencyRequest;
    abilityScoreValue: number;
    abilityScoreName: string;
    levelValue: number;
}

const CharacterStatsEditAbilityScoreProficiency: FC<CharacterStatsEditAbilityScoreProficiencyProps> =
    ({abilityScoreProficiency, abilityScoreValue, abilityScoreName, levelValue}) => {
    const dispatch = useAppDispatch();
    const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);

    const onSaveProficient = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if(!!currentEditCharacter){
            dispatch(setCurrentEditCharacter(({
                ...currentEditCharacter,
                abilityScoreProficiencies: [
                    ...currentEditCharacter.abilityScoreProficiencies?.map(a => {
                        return (a.id === abilityScoreProficiency.id && a.abilityScoreId === abilityScoreProficiency.abilityScoreId)
                            ? {
                                ...a,
                                proficient: !a.proficient
                            } : a
                    }) ?? [],
                ]
            })))
        }
    }

    const modifier = getModifier(abilityScoreValue) + (abilityScoreProficiency.proficient ? getProficiencyBonus(levelValue) : 0);
    return <StyledProficiencyOrSavingThrow>
        <StyledCheckbox
            checked={abilityScoreProficiency.proficient}
            icon={<RadioButtonUncheckedOutlined/>}
            checkedIcon={<RadioButtonCheckedOutlined/>}
            onChange={onSaveProficient}/>
        <Typography variant={"body1"}>{abilityScoreProficiency.name} <em>({abilityScoreName.substr(0, 3).toLowerCase()})</em></Typography>
        <Typography variant={"subtitle2"}>{getModifierAsString(modifier)}</Typography>
    </StyledProficiencyOrSavingThrow>
}

export default CharacterStatsEditAbilityScoreProficiency;