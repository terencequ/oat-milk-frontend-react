import {FC} from "react";
import {CharacterInfoBasicProp} from "./CharacterInfoBasicTypes";
import {LinearProgress, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import GenericDense from "../dense/GenericDense";



const StyledTypography = styled(Typography)`
  text-align: center;
`;


const StyledClassIconWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledClassIcon = styled.img<{numIcons: number}>`
  max-height: ${p => (128 - (p.numIcons * 8)).toString() + "px"};
  max-width: ${p => (128 - (p.numIcons * 8)).toString() + "px"};
  
  width: 4vw;
`;

const StyledLinearProgress = styled(LinearProgress)`
  height: 0.2vw;
  min-height: 4px;
  max-height: 8px;
`;


const CharacterInfoDense: FC<CharacterInfoBasicProp> = ({denseCharacter, style}) => {

  const pctToLevelUp = (exp: number, lastExpRequirement: number, nextExpRequirement: number) => {
    const flatCurrent = exp - lastExpRequirement;
    const flatNext = nextExpRequirement - lastExpRequirement;

    if (flatNext === 0) return 1;

    return flatCurrent / flatNext;
  };

  return <>
    <GenericDense>
      <StyledTypography variant={"h4"}>{denseCharacter.name}</StyledTypography>

      <StyledClassIconWrap>
        {/*{denseCharacter.classImage.map((value, i) => <StyledClassIcon key={i} src={value} numIcons={denseCharacter.classImage.length}/>)}*/}
      </StyledClassIconWrap>

      <div>
        <StyledTypography variant={"h6"}>Level {denseCharacter.level}</StyledTypography>
        <StyledLinearProgress variant={"determinate"} value={100 * pctToLevelUp(denseCharacter.experience ?? 0, denseCharacter.previousLevelExperienceRequirement ?? 0, denseCharacter.nextLevelExperienceRequirement ?? 0)}/>
      </div>
    </GenericDense>
  </>;
};


export default CharacterInfoDense;