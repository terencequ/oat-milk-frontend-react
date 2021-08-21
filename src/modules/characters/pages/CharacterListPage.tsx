import {FC} from "react";
import { PageContainer } from "../../core/styles/GlobalStyles";
import CharacterList from "../components/CharacterList";
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
            <CharacterList/>
        </MainSection>
    </PageContainer>
}

export default CharacterListPage;