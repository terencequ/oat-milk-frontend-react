import {FC} from "react";
import { PageContainer } from "../../core/styles/GlobalStyles";
import CharacterListView from "../components/CharacterListView";

const CharacterListPage: FC = () => {
    return <PageContainer>
        <CharacterListView/>
    </PageContainer>
}

export default CharacterListPage;