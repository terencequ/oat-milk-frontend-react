import {CSSProperties, FC} from "react";
import {LinearProgress, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import GenericDense from "../../shared/components/generic/GenericDense";
import {useHistory} from "react-router-dom";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk/dist/api";

export type CharacterInfoBasicProp = {
  characterSummary: CharacterSummaryResponse;
  style?: CSSProperties;
};

const ClassIconContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClassIcon = styled.img<{numIcons: number}>`
  max-height: ${p => (128 - (p.numIcons * 8)).toString() + "px"};
  max-width: ${p => (128 - (p.numIcons * 8)).toString() + "px"};
  
  width: 4vw;
`;

const CharacterSummaryCard: FC<CharacterInfoBasicProp> = ({characterSummary, style}) => {

  const levelProgress = () => {
    const exp = characterSummary.experience ?? 0;
    const lastExpRequirement = characterSummary.previousLevelExperienceRequirement ?? 0;
    const nextExpRequirement = characterSummary.nextLevelExperienceRequirement ?? 0;

    const flatCurrent = exp - lastExpRequirement;
    const flatNext = nextExpRequirement - lastExpRequirement;

    if (flatNext === 0) return 1;

    return flatCurrent / flatNext;
  };

  const history = useHistory();
  const gotoViewCharacter = () => {
    history.push(`character=${characterSummary.identifier}`)
  }

  return <>
    <GenericDense action={gotoViewCharacter}>
      <Typography align={"center"} variant={"h4"}>{characterSummary.name}</Typography>

      <ClassIconContainer>
        {/*{denseCharacter.classImage.map((value, i) => <StyledClassIcon key={i} src={value} numIcons={denseCharacter.classImage.length}/>)}*/}
      </ClassIconContainer>

      <div>
        <Typography align={"center"} variant={"h6"}>Level {characterSummary.level}</Typography>
        <LinearProgress variant={"determinate"} value={100 * levelProgress()}/>
      </div>
    </GenericDense>
  </>;
};


export default CharacterSummaryCard;