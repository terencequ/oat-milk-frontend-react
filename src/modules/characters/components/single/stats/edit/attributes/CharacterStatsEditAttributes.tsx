import React, {FC} from "react";
import initiativeIcon from "../../../../../../../assets/images/icons/initiative.png";
import {Typography} from "@mui/material";
import {
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
import CharacterStatsViewAttributesDeathSaves from "../../view/attributes/CharacterStatsViewAttributesDeathSaves";
import hitDiceIcon from "../../../../../../../assets/images/icons/hitdice.png";
import spellSlotsIcon from "../../../../../../../assets/images/icons/spellslots.png";
import CharacterStatsViewAttributesSpellSlots from "../../view/attributes/CharacterStatsViewAttributesSpellSlots";
import {StyledAttribute, StyledAttributeLogo, StyledAttributes, StyledWideAttribute } from "../../CharacterStatsStyles";
import {useAppSelector} from "../../../../../../../redux/hooks";
import {CharacterAttributeResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import CharacterStatsEditAttribute from "./CharacterStatsEditAttribute";

const CharacterStatsEditAttributes: FC = (props) => {
    const character = useAppSelector(state => state.characters.currentEditCharacter);

    if(!character){
        return <></>
    }

    const attributesDictionary: {[id: string]: CharacterAttributeResponse}
        = character.attributes?.reduce((a,x) => ({...a, [x.id]: x}), {}) ?? {}; // Convert to dictionary for performance

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
        <StyledAttribute>
            <StyledAttributeLogo src={initiativeIcon}/>
            <Typography variant={"subtitle1"}>Initiative</Typography>
            <Typography variant={"body1"}>{getModifierAsString(initiative)}</Typography>
        </StyledAttribute>
        <CharacterStatsEditAttribute iconSrc={hitPointsIcon} attribute={hitPointsAttribute} maxValue={999} minValue={0} includeDefaultValue/>
        <CharacterStatsEditAttribute iconSrc={speedIcon} attribute={speedAttribute} maxValue={999} minValue={0}/>
        <StyledAttribute>
            <StyledAttributeLogo src={passivePerceptionIcon}/>
            <Typography variant={"subtitle1"} textAlign={"center"}>Passive Perception</Typography>
            <Typography variant={"body1"}>{passivePerception}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={proficiencyBonusIcon}/>
            <Typography variant={"subtitle1"} textAlign={"center"}>Proficiency Bonus</Typography>
            <Typography variant={"body1"}>{getModifierAsString(proficiencyBonus)}</Typography>
        </StyledAttribute>
        <CharacterStatsEditAttribute iconSrc={armorClassIcon} attribute={armorClassAttribute} maxValue={99} minValue={0}/>
        <StyledWideAttribute>
            <CharacterStatsViewAttributesDeathSaves
                deathSaveSuccesses={deathSaveSuccessesAttribute.currentValue}
                deathSaveFailures={deathSaveFailuresAttribute.currentValue}/>
        </StyledWideAttribute>
        <StyledWideAttribute>
            <StyledAttributeLogo src={hitDiceIcon}/>
            <Typography variant={"subtitle1"}>Hit Dice</Typography>
            <div>
                10d8
            </div>
        </StyledWideAttribute>
        <StyledWideAttribute>
            <StyledAttributeLogo src={spellSlotsIcon}/>
            <CharacterStatsViewAttributesSpellSlots/>
        </StyledWideAttribute>
    </StyledAttributes>
}

export default CharacterStatsEditAttributes;