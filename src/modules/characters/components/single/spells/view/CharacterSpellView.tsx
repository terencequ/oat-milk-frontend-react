import {FC, useState} from "react";
import {CardActionArea, Collapse, Typography} from "@mui/material";
import {CharacterSpellResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {StyledCharacterSpell, StyledCharacterSpellContents, StyledCharacterSpellName} from "../CharacterSpellsStyles";

const CharacterSpellView: FC<{spell: CharacterSpellResponse}> = (props) => {
  const [expand, setExpand] = useState(false);

  /** Toggle expansion on the more info section. */
  const toggleExpand = () => {
    setExpand(!expand);
  }

  return <StyledCharacterSpell>
    {/** Summary Information */}
    <CardActionArea onClick={toggleExpand}>
      <StyledCharacterSpellName>
        <Typography variant={"subtitle1"}>{props.spell.name}</Typography>
      </StyledCharacterSpellName>
    </CardActionArea>

    {/** More Information */}
    <Collapse in={expand}>
      <StyledCharacterSpellContents>
        <Typography variant={"h2"} gutterBottom>{props.spell.name}</Typography>
        <Typography variant={"h3"} gutterBottom>Description</Typography>
        <Typography sx={{wordWrap: "break-word", whiteSpace: "pre-line"}}>{props.spell.description}</Typography>
      </StyledCharacterSpellContents>
    </Collapse>

  </StyledCharacterSpell>
}

export default CharacterSpellView;
