import styled from "@emotion/styled";
import {TextField, Typography} from "@mui/material";
import {CharacterAbilityScoreRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {ChangeEvent, FC, useEffect, useState} from "react";
import ErrorTooltip from "../../../../../../core/components/ErrorTooltip";
import {getModifier, getModifierAsString} from "../../../../../helpers/CharacterStatHelpers";
import {StyledAbilityScore} from "../../CharacterStatsStyles";
import CharacterStatsEditProps from "../models/CharacterStatsEditProps";

const StyledValueField = styled(TextField)`
  width: 70px;
  margin: 0 auto;
`

interface CharacterEditAbilityScoreProps extends CharacterStatsEditProps {
    abilityScore: CharacterAbilityScoreRequest;
}

/**
 * Edit component for a single ability score.
 */
const CharacterEditAbilityScore: FC<CharacterEditAbilityScoreProps> = ({abilityScore, character, setCharacter}) => {
    const initialValue = abilityScore.value?.toString() ?? "";
    const [value, setValue] = useState<string>(initialValue);
    const [error, setError] = useState<string | null>(null);

    /**
     * Update parent state with new ability score value.
     * @param value Value of the ability score. Can be undefined.
     */
    const saveAbilityScoreValue = (value: number | undefined) => {
        setCharacter({
            ...character,
            abilityScores: [
                ...character.abilityScores?.map(a => {
                    return a.id === abilityScore.id ? {
                        ...a,
                        value: value
                    } : a
                }) ?? [],
            ]
        })
    }

    /**
     *
     * @param value
     */
    const updateErrors = (value: number) => {
        if(isNaN(value) || value > 99 || value < -99){
            setError(isNaN(value)
                ? `${abilityScore.name} must be a number!`
                : `${abilityScore.name} must be between -99 and 99!`);
            return true;
        } else {
            setError("");
            return false;
        }
    }

    /**
     * Update ability score value and error messages.
     * @param value Value of the ability score. Can be undefined.
     */
    const updateAbilityScoreValue = (value: number) => {

        const errored = updateErrors(value);
        if(errored){
            saveAbilityScoreValue(undefined);
        } else {
            saveAbilityScoreValue(value);
        }
    }

    /**
     * Callback method for changing Ability Score value.
     * @param event Change text input event.
     */
    const onChangeAbilityScoreValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        const input = event.target.value;
        if(input.length < 4){
            setValue(input);
            let value = Number(input);
            updateAbilityScoreValue(value);
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
                onChange={onChangeAbilityScoreValue}/>
        </ErrorTooltip>

    </StyledAbilityScore>
}

export default CharacterEditAbilityScore;