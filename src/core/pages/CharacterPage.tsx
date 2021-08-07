import React, {FC} from 'react';
import {Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";


type TParams = { id: string; };

const CharacterPage: FC = () => {

  const { id } = useParams<TParams>();

  return <>
    <Typography variant={"h1"}>CharacterPage</Typography>
  </>;
};

export default CharacterPage;
