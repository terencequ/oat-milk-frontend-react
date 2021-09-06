import React, {FC, useEffect} from "react";
import {getCharacterSummaries} from "../../../redux/thunks/characterSummaryThunks";
import { PageContainer } from "../../core/styles/GlobalStyles";
import GenericAsyncComponent from "../../shared/components/GenericAsyncComponent";
import {Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";
import CharacterListAddButton from "../components/list/CharacterListAddButton";
import CharacterListItem from "../components/list/CharacterListItem";

const MainSection = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  min-width: 100%;
`

const CharacterListPage: FC = () => {
    const dispatch = useAppDispatch();
    const {characterSummaries} = useAppSelector(state => state.characters)

    useEffect(() => {
        dispatch(getCharacterSummaries());
    }, [dispatch]);

    document.title = `Oat Milk - My Characters`
    dispatch(setBackground("inherit"));
    return <PageContainer>
        <GenericAsyncComponent existingData={!!characterSummaries} requestId={getCharacterSummaries.name}>
            <>
                <Typography variant={"h1"} align={"left"} gutterBottom>Characters</Typography>
                <MainSection>
                    {characterSummaries.map((value, i) => <CharacterListItem key={i} characterSummary={value}/>)}
                    <CharacterListAddButton/>
                </MainSection>
            </>
        </GenericAsyncComponent>
    </PageContainer>
}

export default CharacterListPage;