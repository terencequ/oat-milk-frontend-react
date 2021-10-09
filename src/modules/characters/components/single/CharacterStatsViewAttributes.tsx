import styled from "@emotion/styled";
import {Button, Card, LinearProgress, Typography} from "@material-ui/core";
import {RadioButtonChecked, RadioButtonUnchecked} from "@material-ui/icons";
import {CharacterAttributeResponse, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {themeSpacing} from "../../../core/styles/GlobalStyles";
import {
    getModifier,
    getModifierAsString,
    getProficiencyBonus,
} from "../../helpers/CharacterStatHelpers";
import CharacterStatsViewDeathSaves from "./CharacterStatsViewDeathSaves";
import CharacterStatsViewSpellSlots from "./CharacterStatsViewSpellSlots";

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

interface CharacterStatsViewAttributesProps {
    character: CharacterResponse;
}

const StyledAttributeLogo = styled.img`
  width: 32px;
  height: 32px;
`

const CharacterStatsViewAttributes: FC<CharacterStatsViewAttributesProps> = ({character}) => {
    const attributesDictionary: {[id: string]: CharacterAttributeResponse}
        = character.attributes.reduce((a,x) => ({...a, [x.id]: x}), {}); // Convert to dictionary for performance

    function getAttributeById(id: string): CharacterAttributeResponse {
        return attributesDictionary[id]
            ?? {id: id, name: "N/A", currentValue: 0, defaultValue: 0};
    }

    console.log(attributesDictionary);

    const speedAttribute = getAttributeById("speed");
    const hitPointsAttribute = getAttributeById("hitPoints");
    const armorClassAttribute = getAttributeById("armorClass");
    const deathSaveSuccessesAttribute = getAttributeById("deathSaveSuccesses");
    const deathSaveFailuresAttribute = getAttributeById("deathSaveFailures");
    console.log(attributesDictionary);

    const passivePerception = 10 + getModifier(character.abilityScores?.find(as => as.id === "wisdom")?.value ?? 10);
    const proficiencyBonus = getProficiencyBonus(character.level.level);
    const initiative = getModifier(character.abilityScores?.find(as => as.id === "dexterity")?.value ?? 10);

    return <StyledAttributes>
        <StyledAttribute>
            <StyledAttributeLogo src={"images/icons/initiative.png"}/>
            <Typography variant={"subtitle1"}>Initiative</Typography>
            <Typography variant={"body1"}>{getModifierAsString(initiative)}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={"images/icons/hitpoints.png"}/>
            <Typography variant={"subtitle1"}>{hitPointsAttribute.name}</Typography>
            <Typography variant={"body1"}>{hitPointsAttribute.currentValue}/{hitPointsAttribute.defaultValue}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={"images/icons/speed.png"}/>
            <Typography variant={"subtitle1"}>{speedAttribute.name}</Typography>
            <Typography variant={"body1"}>{speedAttribute.currentValue}ft</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={"images/icons/passiveperception.png"}/>
            <Typography variant={"subtitle1"} textAlign={"center"}>Passive Perception</Typography>
            <Typography variant={"body1"}>{passivePerception}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={"images/icons/proficiency.png"}/>
            <Typography variant={"subtitle1"} textAlign={"center"}>Proficiency Bonus</Typography>
            <Typography variant={"body1"}>{getModifierAsString(proficiencyBonus)}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <StyledAttributeLogo src={"images/icons/armorclass.png"}/>
            <Typography variant={"subtitle1"} textAlign={"center"}>{armorClassAttribute.name}</Typography>
            <Typography variant={"body1"}>{armorClassAttribute.currentValue}</Typography>
        </StyledAttribute>
        <StyledWideAttribute>
            <CharacterStatsViewDeathSaves
                deathSaveSuccesses={deathSaveSuccessesAttribute.currentValue}
                deathSaveFailures={deathSaveFailuresAttribute.currentValue}/>
        </StyledWideAttribute>
        <StyledWideAttribute>
            <StyledAttributeLogo src={"images/icons/hitdice.png"}/>
            <Typography variant={"subtitle1"}>Hit Dice</Typography>
            <div>
                10d8
            </div>
        </StyledWideAttribute>
        <StyledWideAttribute>
            <StyledAttributeLogo src={"images/icons/spellslots.png"}/>
            <CharacterStatsViewSpellSlots/>
        </StyledWideAttribute>
    </StyledAttributes>
}

export default CharacterStatsViewAttributes;