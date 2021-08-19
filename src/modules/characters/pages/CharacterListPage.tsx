import {FC} from "react";
import { PageContainer } from "../../core/styles/GlobalStyles";
import CharacterListView from "../components/CharacterListView";
import {Breadcrumbs, Link, Typography} from "@material-ui/core";
import BreadcrumbTrail from "../../shared/components/BreadcrumbTrail";

const CharacterListPage: FC = () => {
    return <PageContainer>
        <BreadcrumbTrail links={[
            {
                displayName: "Home",
                href: "/"
            },
            {
                displayName: "My Characters",
                href: "/characters"
            }
        ]}/>
        <Typography gutterBottom variant={"h1"}>My Characters</Typography>
        <CharacterListView/>
    </PageContainer>
}

export default CharacterListPage;