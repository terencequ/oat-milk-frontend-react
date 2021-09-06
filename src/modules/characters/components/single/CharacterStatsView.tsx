import styled from "@emotion/styled";
import {Fade} from "@material-ui/core";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {themeSpacing} from "../../../core/styles/GlobalStyles";
import CharacterStatsViewAbilityScoresAndProficiencies from "./CharacterStatsViewAbilityScoresAndProficiencies";
import CharacterStatsViewAttributes from "./CharacterStatsViewAttributes";

const StyledStatsView = styled.div`
  display: grid;
  grid-template-columns: auto auto 2fr;
  grid-column-gap: ${themeSpacing(2)};
`

const CharacterStatsView: FC<{character: CharacterResponse}> = ({character}) => {
    return <StyledStatsView>
        <CharacterStatsViewAbilityScoresAndProficiencies character={character}/>
        <CharacterStatsViewAttributes character={character}/>
        <div/>
    </StyledStatsView>;
}

export default CharacterStatsView;