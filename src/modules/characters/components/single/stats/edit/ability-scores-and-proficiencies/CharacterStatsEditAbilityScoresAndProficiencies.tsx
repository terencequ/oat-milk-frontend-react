import {Typography} from "@mui/material";
import {CharacterRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {FC} from "react";
import {getLevel} from "../../../../../helpers/CharacterStatHelpers";
import {
    StyledAbilityScores,
    StyledAbilityScoresAndProficiencies,
    StyledProficiencies,
    StyledProficienciesContainer
} from "../../CharacterStatsStyles";
import CharacterStatsEditProps from "../models/CharacterStatsEditProps";
import CharacterEditAbilityScore from "./CharacterStatsEditAbilityScore";
import CharacterStatsEditAbilityScoreProficiency from "./CharacterStatsEditAbilityScoreProficiency";
import CharacterStatsEditSavingThrowProficiency from "./CharacterStatsEditSavingThrowProficiency";

interface CharacterStatsEditAbilityScoresAndProficienciesProps extends CharacterStatsEditProps{
    character: CharacterRequest;
}

const CharacterStatsEditAbilityScoresAndProficiencies: FC<CharacterStatsEditAbilityScoresAndProficienciesProps> = (props) => {
    const {character} = props;
    const abilityScores = character.abilityScores ?? [];
    const abilityScoreProficiencies = character
        ?.abilityScoreProficiencies
        ?.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")) ?? [];
    const characterLevel = getLevel(character.attributes?.find(a => a.id === "experience")?.currentValue ?? 0);
    return <StyledAbilityScoresAndProficiencies>
        <StyledAbilityScores>
            {abilityScores.map((value, index) => {
                return <CharacterEditAbilityScore
                    key={index}
                    abilityScore={value}
                    {...props}/>
            })}
        </StyledAbilityScores>
        <StyledProficiencies>
            <StyledProficienciesContainer>
                <Typography variant={"subtitle1"} gutterBottom align={"center"}>Saving Throws</Typography>
                {abilityScores.map((value, index) => {
                    return <CharacterStatsEditSavingThrowProficiency
                        key={index}
                        abilityScore={value}
                        levelValue={characterLevel}
                        {...props}/>
                })}
            </StyledProficienciesContainer>
            <StyledProficienciesContainer>
                <Typography variant={"subtitle1"} gutterBottom align={"center"}>Proficiencies</Typography>
                {abilityScoreProficiencies
                    .map((value, index) => {
                        const abilityScore = abilityScores.find(as => as.id === value.abilityScoreId);
                        return <CharacterStatsEditAbilityScoreProficiency
                            key={index}
                            abilityScoreProficiency={value}
                            abilityScoreName={abilityScore?.name ?? ""}
                            abilityScoreValue={abilityScore?.value ?? 10}
                            levelValue={characterLevel}
                            {...props}/>
                    })}
            </StyledProficienciesContainer>
        </StyledProficiencies>
    </StyledAbilityScoresAndProficiencies>
}

export default CharacterStatsEditAbilityScoresAndProficiencies;