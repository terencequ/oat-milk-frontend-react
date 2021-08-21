import React, {FC, useEffect} from 'react';
import {CircularProgress, Typography} from "@material-ui/core";
import CharacterListItem from "./CharacterListItem";
import styled from "@emotion/styled";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterSummaries} from "../../../redux/thunks/characterSummaryThunks";
import CharacterListAddButton from "./CharacterListAddButton";
import {requestSelector} from "../../../redux/slices/requestsSlice";
import {getCharacterByIdentifier} from "../../../redux/thunks/characterThunks";
import {RequestStatus} from "../../../redux/actions/requestStatus";

const MainContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

const CircularProgressContainer = styled.div`
  width: 100%;
  height: 15vw;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CharacterSummaryContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start; 
  align-items: center;
  min-width: 100%;
`;

/**
 * Retrieves and displays character sheet summaries in a vertical list.
 * @constructor
 */
const CharacterListView: FC = () => {
    const dispatch = useAppDispatch();
    const { status, } = requestSelector(getCharacterByIdentifier.name)();
    const {characterSummaries} = useAppSelector(state => state.characters)
    
    useEffect(() => {
        dispatch(getCharacterSummaries());
    }, [dispatch]);
    
    return <MainContainer>
            <Typography align={"left"} margin={"normal"} variant={"h3"}>Characters ({characterSummaries !== undefined ? characterSummaries.length : "0"})</Typography>
            {status === RequestStatus.InProgress ?
                <CircularProgressContainer>
                    <CircularProgress/>
                </CircularProgressContainer>
                :
                <CharacterSummaryContainer>
                    {characterSummaries.map((value, i) => <CharacterListItem key={i} characterSummary={value}/>)}
                    <CharacterListAddButton/>
                </CharacterSummaryContainer>
            }

        </MainContainer>;
    };

    export default CharacterListView;
