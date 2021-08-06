import {FC} from "react";
import {CharacterInfoBasicProp} from "./CharacterInfoBasicTypes";
import {Card, CardContent, LinearProgress, Typography} from "@material-ui/core";
import styled from "@emotion/styled";



const StyledCard = styled(Card)`
  width: 15vw;
  height: 15vw;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
  max-height: 7vh;
  overflow-y: hidden;
`;



const CharacterInfoDense: FC<CharacterInfoBasicProp> = ({character}) => {
  console.log(character);

  return <>
    <StyledCard variant={"outlined"}>
      <CardContent>
        <StyledTypography variant={"h5"}>{character.name}</StyledTypography>
        <StyledTypography variant={"body1"}>Lvl {character.level}</StyledTypography>

        <LinearProgress variant={"determinate"} value={100 * character.exp / character.levelUpExpRequirement}/>
      </CardContent>
    </StyledCard>
  </>;
};


export default CharacterInfoDense;