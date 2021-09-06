import styled from "@emotion/styled";
import {Fade} from "@material-ui/core";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {themeSpacing} from "../../../core/styles/GlobalStyles";
import CharacterStatsViewAbilityScoresAndProficiencies from "./CharacterStatsViewAbilityScoresAndProficiencies";

const StyledStatsView = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-column-gap: ${themeSpacing(2)};
`

const CharacterStatsView: FC<{character: CharacterResponse}> = ({character}) => {
    return <StyledStatsView>
        <CharacterStatsViewAbilityScoresAndProficiencies character={character}/>
        <div/>
        <div/>
    </StyledStatsView>;
}

export default CharacterStatsView;