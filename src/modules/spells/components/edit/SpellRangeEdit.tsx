import {ChangeEvent, FC} from "react";
import styled from "@emotion/styled";
import {
    SpellRangeRequest,
    SpellRangeTargetType,
    SpellRangeEffectType
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {themeSpacing} from "../../../core/styles/GlobalStyles";
import _ from "lodash";

const StyledRange = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledRangeForm = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-column-gap: ${themeSpacing(1)};
`

interface SpellRangeEditProps {
    range: SpellRangeRequest;
    setRange: (range: SpellRangeRequest) => void;
}

const SpellRangeEdit : FC<SpellRangeEditProps> = ({range, setRange}) => {
    /**
     * Change the value of the spell's target range.
     * @param e
     */
    const onChangeTargetValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const string = e.target.value.replaceAll(/[^0-9]/g, '').substr(0, 2);
        const int = parseInt(string === "" ? "1" : string);
        let newRange: SpellRangeRequest = {
            targetValue: int,
            targetType: range.targetType,
            effectValue: range.effectValue,
            effectType: range.effectType
        };
        setRange(newRange);
    }

    /**
     * Change the type of the spell's target range.
     * @param e
     */
    const onChangeTargetType = (e: SelectChangeEvent) => {
        let newRange: SpellRangeRequest = {
            targetValue: range.targetValue,
            targetType:  e.target.value as SpellRangeTargetType,
            effectValue: range.effectValue,
            effectType: range.effectType
        };
        setRange(newRange);
    }

    /**
     * Change the value of the spell's effect range.
     * @param e
     */
    const onChangeEffectValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const string = e.target.value.replaceAll(/[^0-9]/g, '').substr(0, 2);
        const int = parseInt(string === "" ? "1" : string);
        let newRange: SpellRangeRequest = {
            targetValue: range.targetValue,
            targetType: range.targetType,
            effectValue: int,
            effectType: range.effectType
        };
        setRange(newRange);
    }

    /**
     * Change the type of the spell's effect range.
     * @param e
     */
    const onChangeEffectType = (e: SelectChangeEvent) => {
        let newRange: SpellRangeRequest = {
            targetValue: range.targetValue,
            targetType: range.targetType,
            effectValue: range.effectValue,
            effectType: e.target.value as SpellRangeEffectType
        };
        setRange(newRange);
    }

    return <>
        <StyledRange>
            <Typography gutterBottom variant={"subtitle1"}>Target Range</Typography>
            <StyledRangeForm>
                <FormControl>
                    <TextField variant={"filled"} label={"Value (ft)"} value={range.targetValue ?? ""} onChange={onChangeTargetValue}/>
                </FormControl>
                <FormControl variant="filled">
                    <InputLabel id={"spellRangeTargetTypeLabel"}>Type</InputLabel>
                    <Select
                        labelId={"spellRangeTargetTypeLabel"}
                        id={"spellRangeTargetType"}
                        value={range.targetType ?? ''}
                        onChange={onChangeTargetType}
                    >
                        {
                            Object.keys(SpellRangeTargetType).map((type, index) => <MenuItem value={type} key={index}>{_.startCase(type)}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </StyledRangeForm>
        </StyledRange>
        <StyledRange>
            <Typography gutterBottom variant={"subtitle1"}>Effect Range</Typography>
            <StyledRangeForm>
                <FormControl>
                    <TextField variant={"filled"} label={"Value (ft)"} value={range.effectValue ?? ""} onChange={onChangeEffectValue}/>
                </FormControl>
                <FormControl variant="filled">
                    <InputLabel id={"spellRangeTargetTypeLabel"}>Type</InputLabel>
                    <Select
                        labelId={"spellRangeEffectTypeLabel"}
                        id={"spellRangeEffectType"}
                        value={range.effectType ?? ''}
                        onChange={onChangeEffectType}
                    >
                        {
                            Object.keys(SpellRangeEffectType).map((type, index) => <MenuItem value={type} key={index}>{_.startCase(type)}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </StyledRangeForm>
        </StyledRange>
    </>
}

export default SpellRangeEdit;
