import {FC} from "react";
import {useDispatch} from "react-redux";
import { StyledStats } from "../CharacterStatsStyles";
import CharacterStatsEditAbilityScoresAndProficiencies from "./ability-scores-and-proficiencies/CharacterStatsEditAbilityScoresAndProficiencies";
import CharacterStatsEditAttributes from "./attributes/CharacterStatsEditAttributes";

const CharacterStatsEdit: FC = ({}) => {
    return <>
        <StyledStats>
            <CharacterStatsEditAbilityScoresAndProficiencies/>
            <CharacterStatsEditAttributes/>
        </StyledStats>
    </>
}

export default CharacterStatsEdit;