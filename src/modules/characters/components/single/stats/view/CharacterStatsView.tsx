import {FC} from "react";
import { StyledStats } from "../CharacterStatsStyles";
import CharacterStatsViewAbilityScoresAndProficiencies from "./ability-scores-and-proficiencies/CharacterStatsViewAbilityScoresAndProficiencies";
import CharacterStatsViewAttributes from "./attributes/CharacterStatsViewAttributes";

const CharacterStatsView: FC = (props) => {
    return <StyledStats>
        <CharacterStatsViewAbilityScoresAndProficiencies/>
        <CharacterStatsViewAttributes/>
    </StyledStats>;
}

export default CharacterStatsView;