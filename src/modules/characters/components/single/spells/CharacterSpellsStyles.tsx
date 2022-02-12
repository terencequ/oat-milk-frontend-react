import styled from "@emotion/styled";
import {Card} from "@mui/material";
import {themeSpacing} from "../../../../core/styles/GlobalStyles";

export const StyledCharacterSpells = styled.div`
    
`

export const StyledCharacterSpellsContainer = styled.div<{totalItemCount: number}>`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: ${themeSpacing(1)};
  grid-row-gap: ${themeSpacing(1)};
`

export const StyledCharacterSpell = styled(Card)`

`

export const StyledCharacterSpellName = styled.div`
  padding: ${themeSpacing(2)};
`

export const StyledCharacterSpellContents = styled.div`
  padding: ${themeSpacing(4)};
  .properties {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: ${themeSpacing(3)};
    margin-bottom: ${themeSpacing(2)};
  }
`

export const StyledCharacterSpellContentsProperty = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: ${themeSpacing(2)};
`
