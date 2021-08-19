import React, {FC, useEffect, useState} from 'react';
import {CircularProgress, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterByIdentifier} from "../../../redux/thunks/characterThunks";
import {setCurrentCharacter} from "../../../redux/slices/charactersSlice";
import styled from "@emotion/styled";
import {HeroContainer, PageContainer } from '../../core/styles/GlobalStyles';
import {requestSelector} from "../../../redux/slices/requestsSlice";
import {login} from "../../../redux/thunks/userThunks";
import {RequestStatus} from "../../../redux/actions/requestStatus";

const CircularProgressContainer = styled.div`
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

type TParams = { id: string; };

const CharacterViewPage: FC = () => {
  const { id } = useParams<TParams>();

  const dispatch = useAppDispatch();
  const { status, error } = requestSelector(getCharacterByIdentifier.name)();

  const getCurrentCharacter = async() => {
    dispatch(getCharacterByIdentifier(id));
  }
  const currentCharacter = useAppSelector(state => state.characters.currentCharacter)


  useEffect(() => {
    getCurrentCharacter().then();
  }, [])

  return <PageContainer>
    {
      currentCharacter &&
      <HeroContainer>
        <Typography align={"center"} variant={"h1"}>{currentCharacter.name}</Typography>
      </HeroContainer>
    }
    {
      status === RequestStatus.InProgress &&
      <>
        <CircularProgressContainer>
          <CircularProgress/>
        </CircularProgressContainer>
      </>
    }
    </PageContainer>;
};

export default CharacterViewPage;
