import {FC} from "react";
import {useAppSelector} from "../../../../../../redux/hooks";
import {CharacterDescriptionRequest,} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import CharacterDescriptionEdit from "./CharacterDescriptionEdit";
import {StyledDescriptions} from "../CharacterDescriptionsStyles";

const CharacterDescriptionsEdit: FC = () => {
  const currentEditCharacterDescriptions = useAppSelector(state => state.characters.currentEditCharacter)?.descriptions ?? [];

  const getDescription = (id: string): CharacterDescriptionRequest | null => {
    console.log(currentEditCharacterDescriptions);
    return currentEditCharacterDescriptions.find(d => d.id === id) ?? null;
  }

  const personalityTraits = getDescription("personalityTraits");
  const ideals = getDescription("ideals");
  const bonds = getDescription("bonds");
  const flaws = getDescription("flaws");
  const alliesAndOrganisations = getDescription("alliesAndOrganisations");
  const appearance = getDescription("appearance");
  const backstory = getDescription("backstory");

  return <StyledDescriptions>
    <CharacterDescriptionEdit description={personalityTraits} maxLength={200}/>
    <CharacterDescriptionEdit description={ideals} maxLength={200}/>
    <CharacterDescriptionEdit description={bonds} maxLength={200}/>
    <CharacterDescriptionEdit description={flaws} maxLength={200}/>
    <CharacterDescriptionEdit description={alliesAndOrganisations} maxLength={200}/>
    <CharacterDescriptionEdit description={appearance} maxLength={200}/>
    <CharacterDescriptionEdit description={backstory} maxLength={1000} columnSpan={2} rows={13}/>
  </StyledDescriptions>
}

export default CharacterDescriptionsEdit;
