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

export const StyledAbilityScore = styled.div`
  display: grid;
  grid-template-rows: [Name] 25% [Modifier] 50% [Value] 25%;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: ${themeSpacing(2)};
  height: 100%;
`

export const StyledProficiencyOrSavingThrow = styled.div`
  display: grid;
  grid-template-columns: [Is Proficient] auto [Name] 12rem [Modifier] 40px;
  grid-column-gap: ${themeSpacing(1)};
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 ${themeSpacing(1)};
`

export const StyledAttributes = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${themeSpacing(1)};
  grid-row-gap: ${themeSpacing(1)};
`

export const StyledAttribute = styled(Card)<{columnWidth?: number}>`
  grid-column: span ${props => props.columnWidth ?? 1};
  display: grid;
  grid-template-rows: 1fr auto 40px;
  justify-items: center;
  align-items: center;
  padding: ${themeSpacing(2)};
`

export const StyledWideAttribute = styled(Card)`
  grid-column: span 2;
  display: grid;
  grid-template-rows: 1fr auto 30px;
  justify-items: center;
  align-items: center;
  padding: ${themeSpacing(2)};
`

export const StyledAttributeLogo = styled.img`
  width: 32px;
  height: 32px;
`