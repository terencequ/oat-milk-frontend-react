import React, {FC, useEffect, useState} from 'react';
import {CircularProgress, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterByIdentifier} from "../../../api/clients/CharacterClient";
import {setCurrentCharacter} from "../../../redux/slices/charactersSlice";
import styled from "@emotion/styled";

const CircularProgressContainer = styled.div`
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

type TParams = { id: string; };

const CharacterViewPage: FC = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentCharacter = useAppSelector(state => state.characters.currentCharacter)

  const { id } = useParams<TParams>();
  const dispatch = useAppDispatch();

  const getCurrentCharacter = async() => {
    const [res, error] = await getCharacterByIdentifier(id)
    if(res){
      dispatch(setCurrentCharacter(res));
    } else if(error){
      dispatch(setCurrentCharacter(null));
    } else {
      dispatch(setCurrentCharacter(null));
    }
  }

  useEffect(() => {
    getCurrentCharacter().then();
  }, [])

  return <>
    {
      currentCharacter
          ?
          <>
            <Typography variant={"h1"}>{currentCharacter.name}</Typography>
          </>
          :
          <>
            <CircularProgressContainer>
              <CircularProgress/>
            </CircularProgressContainer>
          </>
    }
    </>;
};

export default CharacterViewPage;
