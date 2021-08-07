import React, {FC} from 'react';
import {Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";


type TParams = { id: string; };

const CharacterPage: FC = () => {

  //const { id } = useParams<TParams>(); // I have commented this out because an unused variable makes the pipeline break

  return <>
    <Typography variant={"h1"}>CharacterPage</Typography>
  </>;
};

export default CharacterPage;
