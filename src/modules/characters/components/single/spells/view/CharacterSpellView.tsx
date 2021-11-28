import {FC, useState} from "react";
import {Card, CardActionArea, Collapse, Typography} from "@mui/material";
import {CharacterSpellResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {StyledCharacterSpell, StyledCharacterSpellContents, StyledCharacterSpellName} from "../CharacterSpellsStyles";

const CharacterSpellView: FC<{spell: CharacterSpellResponse}> = (props) => {
  const [expand, setExpand] = useState(false);

  /** Toggle expansion on the more info section. */
  const toggleExpand = () => {
    setExpand(!expand);
  }

  return <StyledCharacterSpell>
    <CardActionArea onClick={toggleExpand}>
      <StyledCharacterSpellName>
        <Typography variant={"subtitle1"}>{props.spell.name}</Typography>
      </StyledCharacterSpellName>
    </CardActionArea>

    {/** More Information */}
    <Collapse in={expand}>
      <StyledCharacterSpellContents>
        <Typography>{props.spell.description}</Typography>
      </StyledCharacterSpellContents>
    </Collapse>

  </StyledCharacterSpell>
}

export default CharacterSpellView;
