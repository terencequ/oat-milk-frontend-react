import styled from "@emotion/styled";
import {Typography} from "@mui/material";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {themeSpacing} from "../../../../../core/styles/GlobalStyles";

const StyledStatsView = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: ${themeSpacing(2)};
`

const CharacterStatsEdit: FC<{character: CharacterResponse}> = ({character}) => {
    return <>

    </>
}

export default CharacterStatsEdit;