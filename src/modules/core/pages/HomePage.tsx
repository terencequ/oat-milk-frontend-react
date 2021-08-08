import React, {FC, useEffect, useState} from 'react';
import {CardContent, CircularProgress, Divider, Typography} from "@material-ui/core";
import CharacterInfoDense from "../../characters/components/CharacterInfoDense";
import styled from "@emotion/styled";
import {CharacterSummaryApi} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import CharacterAdd from "../../characters/components/CharacterAdd";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk/dist/api";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterSummaries} from "../../../redux/slices/charactersSlice";


const StyledSection = styled.section`
  margin-bottom: 2vw;
`;

const StyledHeroText = styled(Typography)`
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  
  padding: 5vw 0;

  font-family: "Josefin Slab", "Roboto", "Helvetica", "Arial", sans-serif;
`;


const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-flow: column;
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 1vw;
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
  }, []);


  const {characterSummaries} = useAppSelector(state => state.characters)

  return <>
    <StyledSection>
      <StyledHeroText variant={"h1"}>Welcome patrons,<br/>new and old</StyledHeroText>

      <StyledCardContent>
        <StyledDivider/>
        <StyledCharactersText variant={"h3"}>Characters ({characterSummaries !== undefined ? characterSummaries.length : "0"})</StyledCharactersText>

        {characterSummaries === undefined
          ? <StyledCircularProgressWrap>
              <CircularProgress size={100}/>
            </StyledCircularProgressWrap>
          : <>
            <StyledDenseWrap>
              {characterSummaries.map((value, i) => <CharacterInfoDense key={i} denseCharacter={value}/>)}
              <CharacterAdd/>
            </StyledDenseWrap>
          </>}

      </StyledCardContent>
    </StyledSection>
  </>;
};

export default HomePage;
