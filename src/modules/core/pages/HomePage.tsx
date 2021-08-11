import React, {FC, useEffect} from 'react';
import {CardContent, CircularProgress, Divider, Typography} from "@material-ui/core";
import CharacterInfoDense from "../../characters/components/CharacterInfoDense";
import styled from "@emotion/styled";
import CharacterAdd from "../../characters/components/CharacterAdd";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterSummaries} from "../../../redux/slices/charactersSlice";


const StyledSection = styled.section`
  margin-bottom: 2vw;
`;

const HeroContainer = styled.div`
  margin-top: 4vw;
  margin-bottom: 4vw;
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  img {
    width: 256px;
  }
`

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-flow: column;
`;

const StyledCharactersText = styled(Typography)`
  padding-top: 0.5vw;
  padding-bottom: 0.5vw;
  margin: 0.5vw 1vw;
`;

const StyledCircularProgressWrap = styled.div`
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDenseWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; 
  align-items: center;
`;

const HomePage: FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCharacterSummaries());
  }, [dispatch]);


  const {characterSummaries} = useAppSelector(state => state.characters)

  return <>
    <StyledSection>
      <HeroContainer>
        <Typography variant={"h1"}>Home Page</Typography>
      </HeroContainer>

      <StyledCardContent>
        <Divider/>
        <StyledCharactersText variant={"h3"}>Characters ({characterSummaries !== undefined ? characterSummaries.length : "0"})</StyledCharactersText>
        {characterSummaries === undefined
          ? <StyledCircularProgressWrap>
              <CircularProgress size={100}/>
            </StyledCircularProgressWrap>
          : <StyledDenseWrap>
              {characterSummaries.map((value, i) => <CharacterInfoDense key={i} denseCharacter={value}/>)}
              <CharacterAdd/>
            </StyledDenseWrap>}
      </StyledCardContent>
    </StyledSection>
  </>;
};

export default HomePage;
