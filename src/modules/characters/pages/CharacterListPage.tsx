import {FC} from "react";
import { PageContainer } from "../../core/styles/GlobalStyles";
import CharacterListView from "../components/CharacterListView";
import {Typography} from "@material-ui/core";

const CharacterListPage: FC = () => {
    return <PageContainer>
        <Typography gutterBottom variant={"h1"}>My Characters</Typography>
        <CharacterListView/>
    </PageContainer>
}

export default CharacterListPage;