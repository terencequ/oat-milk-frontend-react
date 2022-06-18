import {CharacterAttributeResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {useAppSelector} from "../../../../../../../redux/hooks";
import {
    getHitDiceAsString,
    getModifier,
    getModifierAsString,
    getProficiencyBonus,
} from "../../../../../helpers/CharacterStatHelpers";
import CharacterStatsViewAttributesDeathSaves from "./CharacterStatsViewAttributesDeathSaves";
import armorClassIcon from 'assets/images/icons/armorclass.png';
import initiativeIcon from 'assets/images/icons/initiative.png';
import hitDiceIcon from 'assets/images/icons/hitdice.png';
import hitPointsIcon from 'assets/images/icons/hitpoints.png';
import passivePerceptionIcon from 'assets/images/icons/passiveperception.png';
import proficiencyBonusIcon from 'assets/images/icons/proficiency.png';
import speedIcon from 'assets/images/icons/speed.png';
import {StyledAttributes} from "../../CharacterStatsStyles";
import CharacterStatsViewAttribute from "./CharacterStatsViewAttribute";
import CharacterStatsViewAttributeCustom from "./CharacterStatsViewAttributeCustom";
import {getAttributeById, getCharacterAttributesAsDictionary} from "../../../../../helpers/CharacterNavigationHelpers";
import CharacterStatsViewHitDice from "./CharacterStatsViewHitDice";


const CharacterStatsViewAttributes: FC = () => {
    const character = useAppSelector(state => state.characters.currentCharacter);

    if (!character) {
        return <></>
    }

    const attributesDictionary = getCharacterAttributesAsDictionary(character) // Convert to dictionary for performance

    const speedAttribute = getAttributeById("speed", attributesDictionary);
    const hitPointsAttribute = getAttributeById("hitPoints", attributesDictionary);
    const armorClassAttribute = getAttributeById("armorClass", attributesDictionary);
    const deathSaveSuccessesAttribute = getAttributeById("deathSaveSuccesses", attributesDictionary);
    const deathSaveFailuresAttribute = getAttributeById("deathSaveFailures", attributesDictionary);

    const passivePerception = 10 + getModifier(character.abilityScores?.find(as => as.id === "wisdom")?.value ?? 10);
    const proficiencyBonus = getProficiencyBonus(character.level.number);
    const initiative = getModifier(character.abilityScores?.find(as => as.id === "dexterity")?.value ?? 10);

    return <StyledAttributes>
        <CharacterStatsViewAttributeCustom iconSrc={initiativeIcon} title={"Initiative"} value={getModifierAsString(initiative)}/>
        <CharacterStatsViewAttribute iconSrc={hitPointsIcon} attribute={hitPointsAttribute} includeDefaultValue={true}/>
        <CharacterStatsViewAttribute iconSrc={speedIcon} attribute={speedAttribute} suffix={"ft"}/>
        <CharacterStatsViewAttributeCustom iconSrc={passivePerceptionIcon} title={"Passive perception"} value={passivePerception.toString()}/>
        <CharacterStatsViewAttributeCustom iconSrc={proficiencyBonusIcon} title={"Proficiency bonus"} value={getModifierAsString(proficiencyBonus)}/>
        <CharacterStatsViewAttribute iconSrc={armorClassIcon} attribute={armorClassAttribute}/>
        <CharacterStatsViewHitDice/>
        <CharacterStatsViewAttributesDeathSaves deathSaveSuccesses={deathSaveSuccessesAttribute.currentValue} deathSaveFailures={deathSaveFailuresAttribute.currentValue}/>
    </StyledAttributes>
}

export default CharacterStatsViewAttributes;
