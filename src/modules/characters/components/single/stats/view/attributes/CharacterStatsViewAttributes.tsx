import {Card, Typography} from "@mui/material";
import {CharacterAttributeResponse, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {useAppSelector} from "../../../../../../../redux/hooks";
import {
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
import {StyledAttribute, StyledAttributeLogo, StyledAttributes, StyledWideAttribute } from "../../CharacterStatsStyles";
import CharacterStatsViewAttribute from "./CharacterStatsViewAttribute";
import CharacterStatsViewAttributeCustom from "./CharacterStatsViewAttributeCustom";


const CharacterStatsViewAttributes: FC = (props) => {
    const character = useAppSelector(state => state.characters.currentCharacter);

    if(!character){
        return <></>
    }

    const attributesDictionary: {[id: string]: CharacterAttributeResponse}
        = character.attributes.reduce((a,x) => ({...a, [x.id]: x}), {}); // Convert to dictionary for performance

    function getAttributeById(id: string): CharacterAttributeResponse {
        return attributesDictionary[id]
            ?? {id: id, name: "N/A", currentValue: 0, defaultValue: 0};
    }

    const speedAttribute = getAttributeById("speed");
    const hitPointsAttribute = getAttributeById("hitPoints");
    const armorClassAttribute = getAttributeById("armorClass");
    const deathSaveSuccessesAttribute = getAttributeById("deathSaveSuccesses");
    const deathSaveFailuresAttribute = getAttributeById("deathSaveFailures");

    const passivePerception = 10 + getModifier(character.abilityScores?.find(as => as.id === "wisdom")?.value ?? 10);
    const proficiencyBonus = getProficiencyBonus(character.level.number);
    const initiative = getModifier(character.abilityScores?.find(as => as.id === "dexterity")?.value ?? 10);

    return <StyledAttributes>
        <CharacterStatsViewAttributeCustom iconSrc={initiativeIcon} title={"Initiative"} value={getModifierAsString(initiative)}/>
        <CharacterStatsViewAttribute iconSrc={hitPointsIcon} attribute={hitPointsAttribute} includeDefaultValue={true}/>
        <CharacterStatsViewAttribute iconSrc={speedIcon} attribute={speedAttribute}/>
        <CharacterStatsViewAttributeCustom iconSrc={passivePerceptionIcon} title={"Passive perception"} value={getModifierAsString(passivePerception)}/>
        <CharacterStatsViewAttributeCustom iconSrc={proficiencyBonusIcon} title={"Proficiency bonus"} value={getModifierAsString(proficiencyBonus)}/>
        <CharacterStatsViewAttribute iconSrc={armorClassIcon} attribute={armorClassAttribute}/>
        <CharacterStatsViewAttributeCustom iconSrc={hitDiceIcon} columnWidth={2} title={"Hit dice"} value={"10d8"}/>
        <CharacterStatsViewAttributesDeathSaves deathSaveSuccesses={deathSaveSuccessesAttribute.currentValue} deathSaveFailures={deathSaveFailuresAttribute.currentValue}/>
    </StyledAttributes>
}

export default CharacterStatsViewAttributes;
