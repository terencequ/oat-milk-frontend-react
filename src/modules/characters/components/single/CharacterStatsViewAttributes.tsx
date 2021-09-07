import styled from "@emotion/styled";
import {Card, Typography} from "@material-ui/core";
import {CharacterAttributeResponse, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {themeSpacing} from "../../../core/styles/GlobalStyles";
import CharacterStatsViewDeathSaves from "./CharacterStatsViewDeathSaves";

const StyledAttributes = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  grid-template-columns: 1fr 1fr;
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
  grid-column-end: span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${themeSpacing(2)};
`

interface CharacterStatsViewAttributesProps {
    character: CharacterResponse;
}

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

    return <StyledAttributes>
        <StyledAttribute>
            <Typography variant={"subtitle1"}>Proficiency Bonus</Typography>
            <Typography variant={"body1"}>+2</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <Typography variant={"subtitle1"}>Initiative</Typography>
            <Typography variant={"body1"}>+2</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <Typography variant={"subtitle1"}>Passive Perception</Typography>
            <Typography variant={"body1"}>+2</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <Typography variant={"subtitle1"}>{hitPointsAttribute.name}</Typography>
            <Typography variant={"body1"}>{hitPointsAttribute.currentValue}/{hitPointsAttribute.defaultValue}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <Typography variant={"subtitle1"}>{armorClassAttribute.name}</Typography>
            <Typography variant={"body1"}>{armorClassAttribute.currentValue}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <Typography variant={"subtitle1"}>{speedAttribute.name}</Typography>
            <Typography variant={"body1"}>{speedAttribute.currentValue}ft</Typography>
        </StyledAttribute>
        <StyledWideAttribute>
            <CharacterStatsViewDeathSaves
                deathSaveSuccesses={deathSaveSuccessesAttribute.currentValue}
                deathSaveFailures={deathSaveFailuresAttribute.currentValue}/>
        </StyledWideAttribute>
    </StyledAttributes>
}

export default CharacterStatsViewAttributes;