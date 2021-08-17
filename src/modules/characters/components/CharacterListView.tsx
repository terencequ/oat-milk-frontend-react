import React, {FC, useEffect, useState} from 'react';
import {CardContent, CircularProgress, Typography} from "@material-ui/core";
import CharacterListItem from "./CharacterListItem";
import styled from "@emotion/styled";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterSummaries} from "../../../api/clients/CharacterSummaryClient";
import {setCharacterSummaries} from "../../../redux/slices/charactersSlice";
import CharacterListAddButton from "./CharacterListAddButton";

const MainContainer = styled(CardContent)`
  display: flex;
  flex-flow: column;
`;

const CircularProgressContainer = styled.div`
  margin-top: 2vw;
  width: 100%;
  height: 15vw;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CharacterSummaryContainer = styled.div`
  margin-top: 2vw;
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const getData = async () => {
        setLoading(true);
        const [res, err] = await getCharacterSummaries();
        setLoading(false);
        if(res){ dispatch(setCharacterSummaries(res)); }
        if(err){ setError(err.message ?? null); }
    }
    useEffect(() => {
        getData().then();
    }, []);

    const {characterSummaries} = useAppSelector(state => state.characters)

    return <MainContainer>
            <Typography align={"left"} margin={"normal"} variant={"h3"}>Characters ({characterSummaries !== undefined ? characterSummaries.length : "0"})</Typography>
            {loading ?
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
