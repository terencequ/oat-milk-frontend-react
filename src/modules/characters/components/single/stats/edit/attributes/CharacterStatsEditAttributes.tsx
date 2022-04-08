import React, {FC} from "react";
import initiativeIcon from "../../../../../../../assets/images/icons/initiative.png";
import {
    getHitDiceAsString,
    getLevel,
    getModifier,
    getModifierAsString,
    getProficiencyBonus
} from "../../../../../helpers/CharacterStatHelpers";
import hitPointsIcon from "../../../../../../../assets/images/icons/hitpoints.png";
import speedIcon from "../../../../../../../assets/images/icons/speed.png";
import passivePerceptionIcon from "../../../../../../../assets/images/icons/passiveperception.png";
import proficiencyBonusIcon from "../../../../../../../assets/images/icons/proficiency.png";
import armorClassIcon from "../../../../../../../assets/images/icons/armorclass.png";
import hitDiceIcon from "../../../../../../../assets/images/icons/hitdice.png";
import {StyledAttributes} from "../../CharacterStatsStyles";
import {useAppSelector} from "../../../../../../../redux/hooks";
import {CharacterAttributeResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import CharacterStatsEditAttribute from "./CharacterStatsEditAttribute";
import CharacterStatsViewAttributeCustom from "../../view/attributes/CharacterStatsViewAttributeCustom";
import CharacterStatsEditAttributeDeathSaves from "./CharacterStatsEditAttributeDeathSaves";

const CharacterStatsEditAttributes: FC = () => {
    const character = useAppSelector(state => state.characters.currentEditCharacter);

    if (!character) {
        return <></>
    }

    const attributesDictionary: { [id: string]: CharacterAttributeResponse }
        = character.attributes?.reduce((a, x) => ({...a, [x.id]: x}), {}) ?? {}; // Convert to dictionary for performance

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
    const proficiencyBonus = getProficiencyBonus(getProficiencyBonus(getLevel(getAttributeById("experience").currentValue ?? 0) ?? 0));
    const initiative = getModifier(character.abilityScores?.find(as => as.id === "dexterity")?.value ?? 10);

    return <StyledAttributes>
        <CharacterStatsViewAttributeCustom iconSrc={initiativeIcon} title={"Initiative"} value={getModifierAsString(initiative)}/>
        <CharacterStatsEditAttribute iconSrc={hitPointsIcon} attribute={hitPointsAttribute} maxValue={999} minValue={0} includeDefaultValue={true}/>
        <CharacterStatsEditAttribute iconSrc={speedIcon} attribute={speedAttribute} maxValue={999} minValue={0} suffix={"ft"}/>
        <CharacterStatsViewAttributeCustom iconSrc={passivePerceptionIcon} title={"Passive perception"} value={passivePerception.toString()}/>
        <CharacterStatsViewAttributeCustom iconSrc={proficiencyBonusIcon} title={"Proficiency bonus"} value={getModifierAsString(proficiencyBonus)}/>
        <CharacterStatsEditAttribute iconSrc={armorClassIcon} attribute={armorClassAttribute} maxValue={99} minValue={0}/>
        <CharacterStatsViewAttributeCustom iconSrc={hitDiceIcon} columnWidth={2} title={"Hit dice"} value={getHitDiceAsString(character.attributes, false)} toolTip={"Max: "+getHitDiceAsString(character.attributes, true)}/>
        <CharacterStatsEditAttributeDeathSaves deathSaveSuccesses={deathSaveSuccessesAttribute.currentValue} deathSaveFailures={deathSaveFailuresAttribute.currentValue}/>
    </StyledAttributes>
}

export default CharacterStatsEditAttributes;
