import {FC, useState} from "react";
import {useAppSelector} from "../../../../../../redux/hooks";
import {CharacterDescriptionResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import CharacterDescriptionView from "./CharacterDescriptionView";
import {StyledDescriptions} from "../CharacterDescriptionsStyles";

const CharacterDescriptionsView: FC = () => {
  const currentCharacterDescriptions = useAppSelector(state => state.characters.currentCharacter)?.descriptions ?? [];

  const getDescription = (id: string): CharacterDescriptionResponse | null => {
    return currentCharacterDescriptions?.find(d => d.id === id) ?? null;
  }

  const personalityTraits = getDescription("personalityTraits");
  const ideals = getDescription("ideals");
  const bonds = getDescription("bonds");
  const flaws = getDescription("flaws");
  const alliesAndOrganisations = getDescription("alliesAndOrganisations");
  const appearance = getDescription("appearance");
  const backstory = getDescription("backstory");

  return <StyledDescriptions>
    <CharacterDescriptionView description={personalityTraits}/>
    <CharacterDescriptionView description={ideals}/>
    <CharacterDescriptionView description={bonds}/>
    <CharacterDescriptionView description={flaws}/>
    <CharacterDescriptionView description={alliesAndOrganisations}/>
    <CharacterDescriptionView description={appearance}/>
    <CharacterDescriptionView description={backstory} columnWidth={2}/>
  </StyledDescriptions>
}

export default CharacterDescriptionsView;