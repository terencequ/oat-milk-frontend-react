import React, {FC, useEffect, useState} from 'react';
import {CardContent, CircularProgress, Divider, Typography} from "@material-ui/core";
import CharacterSummaryCard from "./CharacterSummaryCard";
import styled from "@emotion/styled";
import CharacterAddButton from "./CharacterAddButton";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterSummaries} from "../../../api/clients/CharacterSummaryClient";
import {setCharacterSummaries} from "../../../redux/slices/charactersSlice";

const MainContainer = styled(CardContent)`
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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; 
  align-items: center;
`;

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
            <Divider/>
            <Typography margin={"normal"} variant={"h3"}>Characters ({characterSummaries !== undefined ? characterSummaries.length : "0"})</Typography>
            {loading ?
                <CircularProgressContainer>
                    <CircularProgress/>
                </CircularProgressContainer> :
                <CharacterSummaryContainer>
                    {characterSummaries.map((value, i) => <CharacterSummaryCard key={i} characterSummary={value}/>)}
                    <CharacterAddButton/>
                </CharacterSummaryContainer>
            }
        </MainContainer>;
    };

    export default CharacterListView;
