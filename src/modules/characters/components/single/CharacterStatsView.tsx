import styled from "@emotion/styled";
import {Typography} from "@material-ui/core";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {themeSpacing} from "../../../core/styles/GlobalStyles";
import CharacterStatsViewAbilityScoresAndProficiencies from "./CharacterStatsViewAbilityScoresAndProficiencies";
import CharacterStatsViewAttributes from "./CharacterStatsViewAttributes";

const StyledTitle = styled(Typography)`
  padding: ${themeSpacing(2)} 0;
`

const StyledStatsView = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  grid-column-gap: ${themeSpacing(4)};
`

const CharacterStatsView: FC<{character: CharacterResponse}> = ({character}) => {
    return <StyledStatsView>
        <div>
            <StyledTitle variant={"subtitle1"}>Ability Scores and Proficiencies</StyledTitle>
            <CharacterStatsViewAbilityScoresAndProficiencies character={character}/>
        </div>
        <div>
            <StyledTitle variant={"subtitle1"}>Combat Stats</StyledTitle>
            <CharacterStatsViewAttributes character={character}/>
        </div>
    </StyledStatsView>;
}

export default CharacterStatsView;