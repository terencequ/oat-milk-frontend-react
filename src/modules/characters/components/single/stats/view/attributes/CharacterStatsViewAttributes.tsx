import styled from "@emotion/styled";
import {Card, Typography} from "@mui/material";
import {CharacterAttributeResponse, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {useAppSelector} from "../../../../../../../redux/hooks";
import {themeSpacing} from "../../../../../../core/styles/GlobalStyles";
import {
    getModifier,
    getModifierAsString,
    getProficiencyBonus,
} from "../../../../../helpers/CharacterStatHelpers";
import CharacterStatsViewAttributesDeathSaves from "./CharacterStatsViewAttributesDeathSaves";
import CharacterStatsViewAttributesSpellSlots from "./CharacterStatsViewAttributesSpellSlots";
import armorClassIcon from 'assets/images/icons/armorclass.png';
import initiativeIcon from 'assets/images/icons/initiative.png';
import hitDiceIcon from 'assets/images/icons/hitdice.png';
import hitPointsIcon from 'assets/images/icons/hitpoints.png';
import passivePerceptionIcon from 'assets/images/icons/passiveperception.png';
import proficiencyBonusIcon from 'assets/images/icons/proficiency.png';
import speedIcon from 'assets/images/icons/speed.png';
import spellSlotsIcon from 'assets/images/icons/spellslots.png';


const StyledAttributes = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: ${themeSpacing(1)};
  grid-row-gap: ${themeSpacing(1)};
`

const StyledAttribute = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${themeSpacing(2)};
`

const StyledWideAttribute = styled(Card)`
  grid-column-start: 1;
  grid-column-end: span 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${themeSpacing(2)};
`

const StyledAttributeLogo = styled.img`
  width: 32px;
  height: 32px;
`

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
            <Typography variant={"subtitle1"} textAlign={"center"}>Passive Perception</Typography>
            <Typography variant={"body1"}>{passivePerception}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={proficiencyBonusIcon}/>
            <Typography variant={"subtitle1"} textAlign={"center"}>Proficiency Bonus</Typography>
            <Typography variant={"body1"}>{getModifierAsString(proficiencyBonus)}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={armorClassIcon}/>
            <Typography variant={"subtitle1"} textAlign={"center"}>Armor Class</Typography>
            <Typography variant={"body1"}>{armorClassAttribute.currentValue}</Typography>
        </StyledAttribute>
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

export default CharacterStatsViewAttributes;