import React, {ChangeEvent, FC, FocusEvent, useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../../redux/hooks";
import {CharacterAttributeRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {StyledAttribute, StyledAttributeLogo} from "../../CharacterStatsStyles";
import hitPointsIcon from "../../../../../../../assets/images/icons/hitpoints.png";
import {TextField, Typography} from "@mui/material";
import {
    getEditCharacterFormError,
    setCurrentEditCharacter,
    setCurrentEditCharacterFormError
} from "../../../../../../../redux/slices/charactersSlice";
import CharacterEditAbilityScore from "../ability-scores-and-proficiencies/CharacterStatsEditAbilityScore";
import ErrorTooltip from "../../../../../../core/components/ErrorTooltip";
import {castToNumber} from "../../../../../helpers/NumberHelpers";

interface CharacterStatsEditProps {
    iconSrc: string | undefined;
    attribute: CharacterAttributeRequest,
    columnWidth?: number,
    includeDefaultValue?: boolean,
    maxValue: number,
    minValue: number,
}

const CharacterStatsEditAttribute: FC<CharacterStatsEditProps> =
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

    /**
     * Changing current value.
     * @param event Change text input event.
     */
    const onChangeDefaultValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        setDefaultValue(event.target.value);
    }

    /**
     * Changing default value.
     * @param event Change text input event.
     */
    const onChangeCurrentValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        setCurrentValue(event.target.value);
    }

    /**
     * Check errors and persist current value and default to redux.
     * @param event
     */
    const onSaveValue = (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();

        let [currentValueNumber, currentValueError] = castToNumber(currentValue, minValue, maxValue, `${attribute.name}'s current value` ?? "Current value");
        let [defaultValueNumber, defaultValueError] = castToNumber(defaultValue, minValue, maxValue, `${attribute.name}'s max value` ?? "Max value");

        if(currentValueError !== null || defaultValueError !== null){
            setError((currentValueError === null ? "" : currentValueError+"\n") + (defaultValueError))
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

    return <StyledAttribute sx={{gridColumn: `span ${columnWidth}`}}>
        <StyledAttributeLogo src={iconSrc}/>
        <Typography variant={"subtitle1"}>{attribute.name}</Typography>
        <ErrorTooltip open={!!error} title={error ?? ""}>
            <div>
                <TextField variant={"outlined"}
                           size={"small"}
                           value={currentValue}
                           onChange={onChangeCurrentValue}
                           onBlur={onSaveValue}/>
                {
                    includeDefaultValue &&
                        <>
                            <Typography variant={"body1"}>/</Typography>
                            <TextField variant={"outlined"}
                                       size={"small"}
                                       value={defaultValue}
                                       onChange={onChangeDefaultValue}
                                       onBlur={onSaveValue}/>
                        </>
                }
            </div>
        </ErrorTooltip>
    </StyledAttribute>
}

export default CharacterStatsEditAttribute;