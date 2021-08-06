import React, {FC} from 'react';
import {Typography} from "@material-ui/core";
import {CharacterDenseType} from "../components/characters/CharacterInfoBasicTypes";
import CharacterInfoDense from "../components/characters/CharacterInfoDense";



const characters: CharacterDenseType[] = [
  {
    name: "Riven 'Mooneater' Akala",
    level: 4,
    exp: 2000,
    levelUpExpRequirement: 3000,
    classImage: [""],
    alive: true,
    id: 42
  }
];

const HomePage: FC = () => {

  return <>
    <Typography variant={"h1"}>HomePage</Typography>
    <div>
      {characters.map(value => <CharacterInfoDense key={value.id} character={value}/>)}
    </div>
  </>;
};

export default HomePage;
