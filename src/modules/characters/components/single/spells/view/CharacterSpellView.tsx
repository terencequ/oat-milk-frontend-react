import {FC, useState} from "react";
import {Card, CardActionArea, Collapse, Typography} from "@mui/material";
import {CharacterSpellResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {StyledCharacterSpell} from "../CharacterSpellsStyles";

const CharacterSpellView: FC<{spell: CharacterSpellResponse}> = (props) => {
  const [expand, setExpand] = useState(false);

  /** Toggle expansion on the more info section. */
  const toggleExpand = () => {
    setExpand(!expand);
  }

  return <StyledCharacterSpell>
    <div>
      <CardActionArea onClick={toggleExpand}>
        <Typography>{props.spell.name}</Typography>
      </CardActionArea>
    </div>

    {/** More Information */}
    <Collapse in={expand}>
      <Typography>{props.spell.description}</Typography>
    </Collapse>
  </StyledCharacterSpell>
}

export default CharacterSpellView;
