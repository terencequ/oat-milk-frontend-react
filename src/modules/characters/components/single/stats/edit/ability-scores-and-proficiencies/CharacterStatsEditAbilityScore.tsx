import styled from "@emotion/styled";
import {Card, TextField, Typography} from "@mui/material";
import {CharacterAbilityScoreRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {ChangeEvent, FocusEvent, FC, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";
import {
    getEditCharacterFormError,
    setCurrentEditCharacter,
    setCurrentEditCharacterFormError
} from "../../../../../../../redux/slices/characterSlice";
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

    // Error state in redux
    const errorId = `${CharacterEditAbilityScore.name}/${abilityScore.id}`
    const error = getEditCharacterFormError(errorId)();
    const setError = useCallback((newError: string | null) => {
        dispatch(setCurrentEditCharacterFormError({id: errorId, error: newError}))
    }, [dispatch, errorId])

    useEffect(() => {
        setError(null)
    }, [currentEditCharacter, setError])

    /**
     * Changing Ability Score value.
     * @param event Change text input event.
     */
    const onChangeValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        setValue(event.target.value.substr(0, 4));
    }

    /**
     * Check errors and persist Ability Score value to redux.
     * @param event
     */
    const onSaveValue = (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        let valueNumber = Number(value);

        if(isNaN(valueNumber) || valueNumber > 99 || valueNumber < -99){
            setError(isNaN(valueNumber)
                ? `${abilityScore.name} must be a number!`
                : `${abilityScore.name} must be between -99 and 99!`);
            return;
        } else {
            setError(null);
        }

        if(!!currentEditCharacter){
            dispatch(setCurrentEditCharacter({
                ...currentEditCharacter,
                abilityScores: currentEditCharacter.abilityScores?.map(a => {
                    return a.id === abilityScore.id ? {
                        ...a,
                        value: valueNumber
                    } : a
                }) ?? []
            }));
        }
    }

    return <Card>
        <StyledAbilityScore>
            <Typography variant={"subtitle1"}>{abilityScore.name}</Typography>
            {!abilityScore?.value
                ? <Typography variant={"h2"}>N/A</Typography>
                : <Typography variant={"h2"}>{getModifierAsString(getModifier(abilityScore.value))}</Typography>
            }
            <ErrorTooltip open={!!error} title={error ?? ""}>
                <StyledValueField
                    inputProps={{style: { textAlign: 'center' }}}
                    variant={"outlined"}
                    size={"small"}
                    value={value}
                    onChange={onChangeValue}
                    onBlur={onSaveValue}/>
            </ErrorTooltip>

        </StyledAbilityScore>
    </Card>
}

export default CharacterEditAbilityScore;