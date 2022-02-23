import React, {FC, useEffect} from "react";
import {getCharacterSummaries} from "../../../redux/thunks/characterSummaryThunks";
import {StyledPageContainer, themeSpacing} from "../../core/styles/GlobalStyles";
import GenericAsync from "../../shared/components/GenericAsync";
import {Fade, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";
import CharacterListActions from "../components/list/CharacterListActions";
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
    const {characterSummaries} = useAppSelector(state => state.characterSummary)

    useEffect(() => {
        dispatch(getCharacterSummaries());
    }, [dispatch]);

    document.title = `Oat Milk - My Characters`
    dispatch(setBackground("inherit"));
    return <StyledPageContainer>
        <GenericAsync existingData={!!characterSummaries} requestId={getCharacterSummaries.name}>
            <>
                <Typography variant={"h2"}>Characters</Typography>
                <CharacterListActions/>
                <MainSection in appear>
                    <div>
                        <StyledList>
                            {characterSummaries.map((value, i) => <CharacterListItem key={i} characterSummary={value} isMobile={false}/>)}
                        </StyledList>
                    </div>
                </MainSection>
            </>
        </GenericAsync>
    </StyledPageContainer>
}

export default CharacterListPage;
