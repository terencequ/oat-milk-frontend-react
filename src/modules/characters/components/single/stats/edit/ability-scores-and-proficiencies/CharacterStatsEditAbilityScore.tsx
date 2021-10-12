import styled from "@emotion/styled";
import {TextField, Typography} from "@mui/material";
import {CharacterAbilityScoreRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";
import {setCurrentEditCharacter} from "../../../../../../../redux/slices/charactersSlice";
import ErrorTooltip from "../../../../../../core/components/ErrorTooltip";
import {getModifier, getModifierAsString} from "../../../../../helpers/CharacterStatHelpers";
import {StyledAbilityScore} from "../../CharacterStatsStyles";

const StyledValueField = styled(TextField)`
  width: 70px;
  margin: 0 auto;
`

interface CharacterEditAbilityScoreProps {
    abilityScore: CharacterAbilityScoreRequest;
}

/**
 * Edit component for a single ability score.
 */
const CharacterEditAbilityScore: FC<CharacterEditAbilityScoreProps> = ({abilityScore}) => {
    const dispatch = useAppDispatch();
    const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);
    const initialValue = abilityScore.value?.toString() ?? "";
    const [value, setValue] = useState<string>(initialValue);
    const [error, setError] = useState<string | null>(null);

    /**
     * Update parent state with new ability score value.
     * @param value Value of the ability score. Can be undefined.
     */
    const saveValue = (value: number | undefined) => {
        if(!!currentEditCharacter){
            dispatch(setCurrentEditCharacter({
                ...currentEditCharacter,
                abilityScores: [
                    ...currentEditCharacter.abilityScores?.map(a => {
                        return a.id === abilityScore.id ? {
                            ...a,
                            value: value
                        } : a
                    }) ?? [],
                ]
            }))
        }
    }

    /**
     * Update error messages based on value.
     * @param value Value to check errors for.
     */
    const updateErrors = useCallback((value: number) => {
        if(isNaN(value) || value > 99 || value < -99){
            setError(isNaN(value)
                ? `${abilityScore.name} must be a number!`
                : `${abilityScore.name} must be between -99 and 99!`);
            return true;
        } else {
            setError("");
            return false;
        }
    }, [abilityScore.name])

    /**
     * Update ability score value and error messages.
     * @param value Value of the ability score. Can be undefined.
     */
    const updateValue = (value: number) => {
        const errored = updateErrors(value);
        if(!errored){
            saveValue(value);
        }
    }

    /**
     * Callback method for changing Ability Score value.
     * @param event Change text input event.
     */
    const onSaveValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        const input = event.target.value;
        if(input.length < 4){
            setValue(input);
            let value = Number(input);
            updateValue(value);
        }
    }

    useEffect(() => {
        setValue(initialValue);
        updateErrors(abilityScore.value ?? NaN);
    }, [abilityScore.value, initialValue, updateErrors])

    return <StyledAbilityScore>
        <Typography variant={"subtitle1"}>{abilityScore.name}</Typography>
        {!abilityScore?.value
            ? <Typography variant={"h3"}>N/A</Typography>
            : <Typography variant={"h2"}>{getModifierAsString(getModifier(abilityScore.value))}</Typography>
        }
        <ErrorTooltip open={!!error} title={error ?? ""}>
            <StyledValueField
                inputProps={{min: 0, style: { textAlign: 'center' }}}
                variant={"outlined"}
                size={"small"}
                value={value}
                onChange={onSaveValue}/>
        </ErrorTooltip>

    </StyledAbilityScore>
}

export default CharacterEditAbilityScore;