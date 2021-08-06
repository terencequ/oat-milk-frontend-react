import {FC} from "react";
import {CharacterInfoBasicProp} from "./CharacterInfoBasicTypes";
import {Card, CardContent, LinearProgress, Typography} from "@material-ui/core";
import styled from "@emotion/styled";



const StyledCard = styled(Card)`
  width: 15vw;
  height: 15vw;
  
  margin: 0.5vw 1vw;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
  font-size: 1.5vw;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: inherit;
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


const CharacterInfoDense: FC<CharacterInfoBasicProp> = ({chctr, style}) => {
  console.log(chctr);

  const pctToLevelUp = (exp: number, lastExpRequirement: number, nextExpRequirement: number) => {
    const flatCurrent = exp - lastExpRequirement;
    const flatNext = nextExpRequirement - lastExpRequirement;

    if (flatNext === 0) return 1;

    return flatCurrent / flatNext;
  };

  return <>
    <StyledCard variant={"outlined"} style={style}>
      <StyledCardContent>
        <StyledTypography variant={"h4"}>{chctr.name}</StyledTypography>

        <StyledClassIconWrap>
          {chctr.classImage.map((value, i) => <StyledClassIcon key={i} src={value} numIcons={chctr.classImage.length}/>)}
        </StyledClassIconWrap>

        <div>
          <StyledTypography variant={"subtitle1"}>Level {chctr.level}</StyledTypography>
          <StyledLinearProgress variant={"determinate"} value={100 * pctToLevelUp(chctr.exp, chctr.lastExpRequirement, chctr.nextExpRequirement)}/>
        </div>
      </StyledCardContent>
    </StyledCard>
  </>;
};


export default CharacterInfoDense;