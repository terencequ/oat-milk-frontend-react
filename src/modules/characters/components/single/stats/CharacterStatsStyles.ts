import styled from "@emotion/styled";
import {Card} from "@mui/material";
import {themeSpacing} from "../../../../core/styles/GlobalStyles";

/**
 * Container for entire stats page.
 */
export const StyledStats = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: ${themeSpacing(2)};
`

/**
 * Container for ability scores, saving throws and proficiencies.
 */
export const StyledAbilityScoresAndProficiencies = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: ${themeSpacing(1)};
  width: auto;
`

/**
 * Container for ability scores.
 */
export const StyledAbilityScores = styled.div`
  display: grid;
  grid-auto-rows: 150px;
  grid-row-gap: ${themeSpacing(1)};
  width: 150px;
`

export const StyledProficiencies = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: ${themeSpacing(1)};
`

export const StyledProficienciesContainer = styled(Card)`
  padding: ${themeSpacing(2)};
`

export const StyledAbilityScore = styled(Card)`
  display: grid;
  grid-template-rows: [Name] 25% [Modifier] 50% [Value] 25%;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: ${themeSpacing(2)}
`

export const StyledProficiencyOrSavingThrow = styled.div`
  display: grid;
  grid-template-columns: [Is Proficient] 40px [Name] 14rem [Modifier] 2rem;  width: 100%;
  align-items: center;
`