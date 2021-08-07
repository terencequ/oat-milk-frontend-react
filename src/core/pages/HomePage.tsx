import React, {FC, useEffect, useState} from 'react';
import {CardContent, CircularProgress, Divider, Typography} from "@material-ui/core";
import {CharacterDenseType} from "../components/characters/CharacterInfoBasicTypes";
import CharacterInfoDense from "../components/characters/CharacterInfoDense";
import logoIcon128 from "../../assets/logo-128px.png";
import styled from "@emotion/styled";
import {CharacterApi} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import CharacterAdd from "../components/dense/CharacterAdd";



const safeCharacters: CharacterDenseType[] = [
  {
    name: "Riven 'Mooneater' Akala",
    level: 4,
    exp: 2000,
    lastExpRequirement: 1000,
    nextExpRequirement: 3000,
    classImage: [logoIcon128],
    alive: true,
    id: "42"
  },
  {
    name: "Wizard",
    level: 17,
    exp: 2,
    lastExpRequirement: 1,
    nextExpRequirement: 3,
    classImage: [logoIcon128],
    alive: false,
    id: "2"
  },
  {
    name: "Chug the Weaver of Death",
    level: 40,
    exp: 9999999,
    lastExpRequirement: 9999999,
    nextExpRequirement: 9999999,
    classImage: [logoIcon128, logoIcon128, logoIcon128],
    alive: false,
    id: "0"
  },
  {
    name: "Elijah Steelhammer",
    level: 4,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 100,
    classImage: [logoIcon128, logoIcon128, logoIcon128],
    alive: true,
    id: "0"
  },
  {
    name: "Babboon in a Trenchcoat",
    level: 1,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 0,
    classImage: [logoIcon128],
    alive: true,
    id: "18"
  },
  {
    name: "Babboon in a Trenchcoat",
    level: 1,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 0,
    classImage: [logoIcon128],
    alive: true,
    id: "19"
  },
  {
    name: "Babboon in a Trenchcoat",
    level: 1,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 0,
    classImage: [logoIcon128],
    alive: true,
    id: "20"
  },
  {
    name: "Babboon in a Trenchcoat",
    level: 1,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 0,
    classImage: [logoIcon128],
    alive: true,
    id: "21"
  },
  {
    name: "Babboon in a Trenchcoat",
    level: 1,
    exp: 0,
    lastExpRequirement: 0,
    nextExpRequirement: 0,
    classImage: [logoIcon128],
    alive: true,
    id: "22"
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

  const [characters, setCharacters] = useState<CharacterDenseType[] | undefined>(safeCharacters);

  const getCharacters = async () => {
    try {
      let res = await new CharacterApi(undefined, process.env.REACT_APP_API_URL).characterFullGet()

      if (res.status !== 200) {
        // TODO: Toaster here
      }

      let newCharactersFull = res.data.items ?? [];

      if (res.data.hasNextPage) {
        // TODO: Sort this out later
        // Recursive sub-function?
      }

      let newCharactersDense: CharacterDenseType[] = [];
      newCharactersFull.forEach(value => {
        const newDense: CharacterDenseType = {
          alive: (value.attributes?.filter(val => val.id === "hitPoints")[0].currentValue ?? 0) > 0 ?? true,
          classImage: [],
          exp: value.attributes?.filter(val => val.id === "experience")[0].currentValue ?? 0,
          id: value.id ?? "MISSING_ID",
          lastExpRequirement: 0,
          level: 0,
          name: value.name ?? "",
          nextExpRequirement: 0
        };

        newCharactersDense.push(newDense);
      });

      setCharacters(newCharactersDense);
    } catch (err) {
      // TODO: Toaster here
    }
  };


  useEffect(() => {
    getCharacters().then();
  }, []);


  return <>
    <StyledSection>
      <StyledHeroText variant={"h1"}>Welcome patrons,<br/>new and old</StyledHeroText>

      <StyledCardContent>
        <StyledDivider/>
        <StyledCharactersText variant={"h3"}>Characters ({characters !== undefined ? characters.length : "0"})</StyledCharactersText>

        {characters === undefined
          ? <StyledCircularProgressWrap>
              <CircularProgress size={100}/>
            </StyledCircularProgressWrap>
          : <>
            <StyledDenseWrap>
              {characters.map((value, i) => <CharacterInfoDense key={i} chctr={value}/>)}
              <CharacterAdd/>
            </StyledDenseWrap>
          </>}

      </StyledCardContent>
    </StyledSection>
  </>;
};

export default HomePage;
