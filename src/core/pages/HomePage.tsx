import React, {FC} from 'react';
import {CardContent, Divider, Typography} from "@material-ui/core";
import {CharacterDenseType} from "../components/characters/CharacterInfoBasicTypes";
import CharacterInfoDense from "../components/characters/CharacterInfoDense";
import logoIcon128 from "../../assets/logo-128px.png";
import styled from "@emotion/styled";



const characters: CharacterDenseType[] = [
  {
    name: "Riven 'Mooneater' Akala",
    level: 4,
    exp: 2000,
    lastExpRequirement: 1000,
    nextExpRequirement: 3000,
    classImage: [logoIcon128],
    alive: true,
    id: 42
  },
  {
    name: "Wizard",
    level: 17,
    exp: 2,
    lastExpRequirement: 1,
    nextExpRequirement: 3,
    classImage: [logoIcon128],
    alive: false,
    id: 2
  },
  {
    name: "Chug the Weaver of Death",
    level: 40,
    exp: 9999999,
    lastExpRequirement: 9999999,
    nextExpRequirement: 9999999,
    classImage: [logoIcon128, logoIcon128, logoIcon128],
    alive: false,
    id: 0
  },
  {
    name: "Elijah Steelhammer",
    level: 4,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 100,
    classImage: [logoIcon128, logoIcon128, logoIcon128],
    alive: true,
    id: 0
  },
  {
    name: "Babboon in a Trenchcoat",
    level: 1,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 0,
    classImage: [logoIcon128],
    alive: true,
    id: 18
  },
  {
    name: "Babboon in a Trenchcoat",
    level: 1,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 0,
    classImage: [logoIcon128],
    alive: true,
    id: 19
  },
  {
    name: "Babboon in a Trenchcoat",
    level: 1,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 0,
    classImage: [logoIcon128],
    alive: true,
    id: 20
  },
  {
    name: "Babboon in a Trenchcoat",
    level: 1,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 0,
    classImage: [logoIcon128],
    alive: true,
    id: 21
  },
  {
    name: "Babboon in a Trenchcoat",
    level: 1,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 0,
    classImage: [logoIcon128],
    alive: true,
    id: 22
  },
];



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
  padding-bottom: 0.5vw;
`;

const StyledDenseWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; 
  align-items: center;
`;



const HomePage: FC = () => {

  return <>
    <StyledSection>
      <StyledHeroText variant={"h1"}>Welcome patrons,<br/>new and old</StyledHeroText>

      <StyledCardContent>
        <StyledDivider/>
        <StyledCharactersText variant={"h3"}>Characters ({String(characters.length).padStart(2, '0')})</StyledCharactersText>

        <StyledDenseWrap>
          {characters.map((value, i) => <CharacterInfoDense key={i} chctr={value}/>)}
        </StyledDenseWrap>
      </StyledCardContent>
    </StyledSection>
  </>;
};

export default HomePage;
