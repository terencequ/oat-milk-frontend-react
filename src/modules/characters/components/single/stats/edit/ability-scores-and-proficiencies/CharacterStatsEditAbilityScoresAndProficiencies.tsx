import {Typography} from "@mui/material";
import React, {FC} from "react";
import {useAppSelector} from "../../../../../../../redux/hooks";
import {getLevel} from "../../../../../helpers/CharacterStatHelpers";
import {
    StyledAbilityScores,
    StyledAbilityScoresAndProficiencies,
    StyledProficiencies,
    StyledProficienciesContainer
} from "../../CharacterStatsStyles";
import CharacterEditAbilityScore from "./CharacterStatsEditAbilityScore";
import CharacterStatsEditAbilityScoreProficiency from "./CharacterStatsEditAbilityScoreProficiency";
import CharacterStatsEditSavingThrowProficiency from "./CharacterStatsEditSavingThrowProficiency";

const CharacterStatsEditAbilityScoresAndProficiencies: FC = (props) => {
    const currentEditCharacter = useAppSelector(c => c.characters.currentEditCharacter);
    if(currentEditCharacter == null){
        return <></>
    }

    const abilityScores = currentEditCharacter.abilityScores ?? [];
    const abilityScoreProficiencies = [...currentEditCharacter.abilityScoreProficiencies ?? []]
        .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? "")) ?? [];
    const characterLevel = getLevel(currentEditCharacter.attributes?.find(a => a.id === "experience")?.currentValue ?? 0);
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
