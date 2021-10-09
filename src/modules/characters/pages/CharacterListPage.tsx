import React, {FC, useEffect} from "react";
import {getCharacterSummaries} from "../../../redux/thunks/characterSummaryThunks";
import {PageContainer, themeSpacing} from "../../core/styles/GlobalStyles";
import GenericAsyncComponent from "../../shared/components/GenericAsyncComponent";
import {Fade, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";
import CharacterListAddButton from "../components/list/CharacterListAddButton";
import CharacterListItem from "../components/list/CharacterListItem";

const MainSection = styled(Fade)`
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  min-width: 100%;
`

const StyledList = styled.div`
  padding-right: ${themeSpacing(2)};
  padding-bottom: ${themeSpacing(1)};
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
                <Typography variant={"h2"}>Characters</Typography>
                <CharacterListAddButton/>
                <MainSection in appear>
                    <div>
                        <StyledList>
                            {characterSummaries.map((value, i) => <CharacterListItem key={i} characterSummary={value}/>)}
                        </StyledList>
                    </div>
                </MainSection>
            </>
        </GenericAsyncComponent>
    </PageContainer>
}

export default CharacterListPage;