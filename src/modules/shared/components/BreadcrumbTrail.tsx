import {FC, MouseEvent} from "react";
import {Breadcrumbs, Link} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import styled from "@emotion/styled";

const MainContainer = styled(Breadcrumbs)`
`

interface BreadcrumbTrailLink {
    displayName: string;
    href: string;
}
interface BreadcrumbTrailProps {
    links: BreadcrumbTrailLink[];
}
const BreadcrumbTrail: FC<BreadcrumbTrailProps> = (props) => {
    const history = useHistory();

    const navigateToLink =  (href: string) => (e: MouseEvent) => {
        e.preventDefault();
        history.push(href);
    }

    return <MainContainer>
        {props.links.map((value, index) =>
            <Link
                underline={"hover"}
                variant={"inherit"}
                onClick={navigateToLink(value.href)}
                href={""} // this is here for styling
                color={index === props.links.length - 1 ? "textPrimary" : "inherit"}>
                {value.displayName}
            </Link>)
        }
    </MainContainer>
}

export default BreadcrumbTrail;