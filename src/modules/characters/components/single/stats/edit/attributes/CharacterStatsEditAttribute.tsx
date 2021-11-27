import React, {ChangeEvent, FC, FocusEvent, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";
import {CharacterAttributeRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {StyledAttribute, StyledAttributeLogo} from "../../CharacterStatsStyles";
import {TextField, Typography} from "@mui/material";
import {
    getEditCharacterFormError,
    setCurrentEditCharacter,
    setCurrentEditCharacterFormError
} from "../../../../../../../redux/slices/charactersSlice";
import CharacterEditAbilityScore from "../ability-scores-and-proficiencies/CharacterStatsEditAbilityScore";
import ErrorTooltip from "../../../../../../core/components/ErrorTooltip";
import {castToNumber} from "../../../../../helpers/NumberHelpers";
import styled from "@emotion/styled";

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`

const StyledTextField = styled(TextField)`
  width: 70px;
`

interface CharacterStatsEditAttributeProps {
    iconSrc: string | undefined;
    attribute: CharacterAttributeRequest,
    columnWidth?: number,
    includeDefaultValue?: boolean,
    maxValue: number,
    minValue: number,
}

const CharacterStatsEditAttribute: FC<CharacterStatsEditAttributeProps> =
    ({
        iconSrc,
        attribute,
        columnWidth,
        includeDefaultValue,
        maxValue,
        minValue,
     }) => {
    const dispatch = useAppDispatch();
    const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);

    const initialCurrentValue = (attribute.currentValue ?? 0).toString();
    const [currentValue, setCurrentValue] = useState<string>(initialCurrentValue);

    const initialDefaultValue = (attribute.defaultValue ?? 0).toString();
    const [defaultValue, setDefaultValue] = useState<string>(initialDefaultValue);

        // Error state in redux
    const errorId = `${CharacterEditAbilityScore.name}/${attribute.id}`
    const error = getEditCharacterFormError(errorId)();
    const setError = useCallback((newError: string | null) => {
        dispatch(setCurrentEditCharacterFormError({id: errorId, error: newError}))
    }, [dispatch, errorId])

    useEffect(() => {
        setError(null)
    }, [currentEditCharacter, setError])

    /**
     * Changing current value.
     * @param event Change text input event.
     */
    const onChangeDefaultValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        setDefaultValue(event.target.value.substr(0, 5))
    }

    /**
     * Changing default value.
     * @param event Change text input event.
     */
    const onChangeCurrentValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        setCurrentValue(event.target.value.substr(0, 5));
    }

    /**
     * Check errors and persist current value and default to redux.
     * @param event
     */
    const onSaveValue = (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();

        let [currentValueNumber, currentValueError] = castToNumber(currentValue, minValue, maxValue, `${attribute.name} current value` ?? "Current value");
        let [defaultValueNumber, defaultValueError] = castToNumber(defaultValue, minValue, maxValue, `${attribute.name} max value` ?? "Max value");

        if(currentValueError !== null || defaultValueError !== null){
            setError((currentValueError === null ? "" : currentValueError+"\n") + (defaultValueError ?? ""))
            return;
        }

        if(!!currentEditCharacter){
            dispatch(setCurrentEditCharacter({
                ...currentEditCharacter,
                attributes: currentEditCharacter.attributes?.map(d => {
                    return d.id === attribute.id ? {
                        ...d,
                        currentValue: currentValueNumber ?? 0,
                        defaultValue: defaultValueNumber ?? 0
                    } : d;
                }) ?? [],
            }));
        }
    }

    return <StyledAttribute columnWidth={columnWidth}>
        <StyledAttributeLogo src={iconSrc}/>
        <Typography variant={"subtitle1"}>{attribute.name}</Typography>
        <ErrorTooltip open={!!error} title={error ?? ""}>
            <StyledContainer>
                <StyledTextField variant={"outlined"}
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    size={"small"}
                    value={currentValue}
                    onChange={onChangeCurrentValue}
                    onBlur={onSaveValue}/>
                {
                    includeDefaultValue &&
                        <>
                            <Typography variant={"body1"}>/</Typography>
                            <StyledTextField variant={"outlined"}
                                inputProps={{min: 0, style: { textAlign: 'center' }}}
                                size={"small"}
                                value={defaultValue}
                                onChange={onChangeDefaultValue}
                                onBlur={onSaveValue}/>
                        </>
                }
            </StyledContainer>
        </ErrorTooltip>
    </StyledAttribute>
}

export default CharacterStatsEditAttribute;