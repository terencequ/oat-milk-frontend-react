import styled from "@emotion/styled";
import {Card, Radio, Typography} from "@material-ui/core";
import {RadioButtonChecked, RadioButtonUnchecked} from "@material-ui/icons";
import {CharacterAttributeResponse, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {FC} from "react";
import {themeSpacing} from "../../../core/styles/GlobalStyles";
import CharacterStatsViewDeathSaves from "./CharacterStatsViewDeathSaves";
import CharacterStatsViewLevel from "./CharacterStatsViewLevel";

const StyledAttributes = styled.div`
  display: grid;
  grid-template-columns: 150px 150px;
  grid-template-rows: auto auto auto 1fr 1fr;
  grid-column-gap: ${themeSpacing(1)};
  grid-row-gap: ${themeSpacing(2)};
`

const StyledLevel = styled(Card)`
  grid-column-start: 1;
  grid-column-end: span 2;
  padding: ${themeSpacing(2)};
`

const StyledAttribute = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${themeSpacing(2)};
`

const StyledDeathSavesAndFailures = styled(Card)`
  grid-column-start: 1;
  grid-column-end: span 2;
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

    const hitPointsAttribute = getAttributeById("hitPoints");
    const armorClassAttribute = getAttributeById("armorClass");
    const deathSaveSuccessesAttribute = getAttributeById("deathSaveSuccesses");
    const deathSaveFailuresAttribute = getAttributeById("deathSaveFailures");

    return <StyledAttributes>
        <StyledLevel>
            <CharacterStatsViewLevel character={character}/>
        </StyledLevel>
        <StyledAttribute>
            <Typography variant={"subtitle1"}>{hitPointsAttribute.name}</Typography>
            <Typography variant={"body1"}>{hitPointsAttribute.currentValue}/{hitPointsAttribute.defaultValue}</Typography>
        </StyledAttribute>
        <StyledAttribute>
            <Typography variant={"subtitle1"}>{armorClassAttribute.name}</Typography>
            <Typography variant={"body1"}>{armorClassAttribute.currentValue}</Typography>
        </StyledAttribute>
        <StyledDeathSavesAndFailures>
            <CharacterStatsViewDeathSaves
                deathSaveSuccesses={deathSaveSuccessesAttribute.currentValue}
                deathSaveFailures={deathSaveFailuresAttribute.currentValue}/>
        </StyledDeathSavesAndFailures>
    </StyledAttributes>
}

export default CharacterStatsViewAttributes;