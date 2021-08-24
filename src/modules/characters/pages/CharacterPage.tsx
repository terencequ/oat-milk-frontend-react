import React, {FC, useEffect} from 'react';
import {CircularProgress, LinearProgress, Paper, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterByIdentifier} from "../../../redux/thunks/characterThunks";
import styled from "@emotion/styled";
import {HeroContainer, PageContainer, themeSpacing} from '../../core/styles/GlobalStyles';
import {requestSelector} from "../../../redux/slices/requestsSlice";
import {RequestStatus} from "../../../redux/actions/requestStatus";
import CharacterDescriptions from '../components/CharacterDescriptions';
import CharacterStats from "../components/CharacterStats";
import CharacterSummary from "../components/CharacterSummary";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";

const CircularProgressContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionContainer = styled(Paper)`
  width: 100%;
  padding: ${themeSpacing(2)};
  margin-bottom: ${themeSpacing(4)};
`

type TParams = { id: string; };

const CharacterPage: FC = () => {

  const { id } = useParams<TParams>();
  const dispatch = useAppDispatch();
  const { status, } = requestSelector(getCharacterByIdentifier.name)();

  const currentCharacter = useAppSelector(state => state.characters.currentCharacter)

  useEffect(() => {
    dispatch(getCharacterByIdentifier(id));
  }, [dispatch, id])

  document.title = `Oat Milk - View Character | ${currentCharacter?.name ?? "Character"}`
  dispatch(setBackground("inherit"));
  return <PageContainer>
    {
      currentCharacter &&
      <HeroContainer>
        <SectionContainer>
          <Typography align={"center"} variant={"h1"}>{currentCharacter.name}</Typography>
        </SectionContainer>
        <SectionContainer>
          <CharacterSummary character={currentCharacter}/>
        </SectionContainer>
        <SectionContainer>
          <CharacterStats character={currentCharacter}/>
        </SectionContainer>
        <SectionContainer>
          <CharacterDescriptions character={currentCharacter}/>
        </SectionContainer>
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

export default CharacterPage;
