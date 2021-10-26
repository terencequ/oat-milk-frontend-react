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
    const proficiencyBonus = getProficiencyBonus(character.level.level);
    const initiative = getModifier(character.abilityScores?.find(as => as.id === "dexterity")?.value ?? 10);

    return <StyledAttributes>
        <StyledAttribute>
            <StyledAttributeLogo src={initiativeIcon}/>
            <Typography variant={"subtitle1"}>Initiative</Typography>
            <Typography variant={"body1"}>{getModifierAsString(initiative)}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={hitPointsIcon}/>
            <Typography variant={"subtitle1"}>{hitPointsAttribute.name}</Typography>
            <Typography variant={"body1"}>{hitPointsAttribute.currentValue}/{hitPointsAttribute.defaultValue}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={speedIcon}/>
            <Typography variant={"subtitle1"}>{speedAttribute.name}</Typography>
            <Typography variant={"body1"}>{speedAttribute.currentValue}ft</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={passivePerceptionIcon}/>
            <Typography variant={"subtitle1"} textAlign={"center"}>Passive perception</Typography>
            <Typography variant={"body1"}>{passivePerception}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={proficiencyBonusIcon}/>
            <Typography variant={"subtitle1"} textAlign={"center"}>Proficiency bonus</Typography>
            <Typography variant={"body1"}>{getModifierAsString(proficiencyBonus)}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={armorClassIcon}/>
            <Typography variant={"subtitle1"} textAlign={"center"}>Armor class</Typography>
            <Typography variant={"body1"}>{armorClassAttribute.currentValue}</Typography>
        </StyledAttribute>
        <StyledWideAttribute>
            <StyledAttributeLogo src={hitDiceIcon}/>
            <Typography variant={"subtitle1"}>Hit dice</Typography>
            <div>
                10d8
            </div>
        </StyledWideAttribute>
        <StyledWideAttribute>
            <CharacterStatsViewAttributesDeathSaves
                deathSaveSuccesses={deathSaveSuccessesAttribute.currentValue}
                deathSaveFailures={deathSaveFailuresAttribute.currentValue}/>
        </StyledWideAttribute>
    </StyledAttributes>
}

export default CharacterStatsViewAttributes;