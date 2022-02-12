import {RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined} from "@mui/icons-material";
import {Checkbox, Typography} from "@mui/material";
import {
    CharacterAbilityScoreRequest,
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {ChangeEvent, FC, useState} from "react";
import {getModifier, getModifierAsString, getProficiencyBonus} from "../../../../../helpers/CharacterStatHelpers";
import {StyledProficiencyOrSavingThrow} from "../../CharacterStatsStyles";
import styled from "@emotion/styled";
import {setCurrentEditCharacter} from "../../../../../../../redux/slices/characterSlice";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";

const StyledCheckbox = styled(Checkbox)`
  padding: 0;
  justify-content: flex-start;
  width: fit-content;
`

interface CharacterEditSavingThrowProficiencyProps {
    abilityScore: CharacterAbilityScoreRequest,
    levelValue: number,
}

/**
 * Displays a single ability score saving throw.
 */
const CharacterViewSavingThrowProficiency: FC<CharacterEditSavingThrowProficiencyProps> = ({abilityScore, levelValue}) => {
    const dispatch = useAppDispatch();
    const initialProficient = abilityScore.proficient;
    const [proficient, setProficient] = useState(initialProficient);
    const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);

    const onSaveProficient = (event: ChangeEvent<HTMLInputElement>) => {
        // event.preventDefault() seems to cause a double click bug
        const newProficient = !proficient;
        setProficient(newProficient);

        if(!!currentEditCharacter){
            dispatch(setCurrentEditCharacter(({
                ...currentEditCharacter,
                abilityScores: [
                    ...currentEditCharacter.abilityScores?.map(a => {
                        return (a.id === abilityScore.id)
                          ? {
                              ...a,
                              proficient: newProficient
                          } : a
                    }) ?? [],
                ]
            })))
        }
    }

    const modifier = getModifier(abilityScore?.value ?? 0) + (abilityScore.proficient ? getProficiencyBonus(levelValue) : 0);
    return <StyledProficiencyOrSavingThrow>
        <StyledCheckbox
          checked={abilityScore.proficient}
          icon={<RadioButtonUncheckedOutlined/>}
          checkedIcon={<RadioButtonCheckedOutlined/>}
          onChange={onSaveProficient}/>
        <Typography variant={"body1"}>{abilityScore.name}</Typography>
        <Typography variant={"subtitle2"}>{getModifierAsString(modifier)}</Typography>
    </StyledProficiencyOrSavingThrow>
}

export default CharacterViewSavingThrowProficiency;
