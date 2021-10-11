import {Typography} from "@mui/material";
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

const CharacterStatsEditAbilityScoresAndProficiencies: FC<CharacterStatsEditProps> = (props) => {
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
                    abilityScore={value}
                    {...props}/>
            })}
        </StyledAbilityScores>
        <StyledProficiencies>
            <StyledProficienciesContainer>
                <Typography variant={"subtitle1"} gutterBottom align={"center"}>Saving Throws</Typography>
                {abilityScores.map((value, index) => {
                    return <CharacterStatsEditSavingThrowProficiency
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