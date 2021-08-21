import {FC} from "react";
import { PageContainer } from "../../core/styles/GlobalStyles";
import CharacterListView from "../components/CharacterListView";
import {Button, Link, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import {useAppDispatch} from "../../../redux/hooks";

const MainSection = styled.div`

`

const CharacterListPage: FC = () => {
    const dispatch = useAppDispatch();

    return <PageContainer>
        <MainSection>
            <Typography gutterBottom variant={"h2"}>My Characters</Typography>
            <CharacterListView/>
        </MainSection>
    </PageContainer>
}

export default CharacterListPage;