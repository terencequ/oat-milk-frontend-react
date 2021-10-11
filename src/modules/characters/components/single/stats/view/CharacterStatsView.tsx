import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import { StyledStats } from "../CharacterStatsStyles";
import CharacterStatsViewAbilityScoresAndProficiencies from "./ability-scores-and-proficiencies/CharacterStatsViewAbilityScoresAndProficiencies";
import CharacterStatsViewAttributes from "./attributes/CharacterStatsViewAttributes";

const CharacterStatsView: FC<{character: CharacterResponse}> = ({character}) => {
    return <StyledStats>
        <CharacterStatsViewAbilityScoresAndProficiencies character={character}/>
        <CharacterStatsViewAttributes character={character}/>
    </StyledStats>;
}

export default CharacterStatsView;