import {FC, useState} from "react";
import {CardActionArea, Collapse, Typography} from "@mui/material";
import {CharacterSpellResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {
  StyledCharacterSpell,
  StyledCharacterSpellName
} from "../CharacterSpellsStyles";
import CharacterSpellInfoView from "./CharacterSpellInfoView";

const CharacterSpellView: FC<{spell: CharacterSpellResponse}> = ({spell}) => {
  const [expand, setExpand] = useState(false);

  /** Toggle expansion on the more info section. */
  const toggleExpand = () => {
    setExpand(!expand);
  }

  return <StyledCharacterSpell>
    {/** Summary Information */}
    <CardActionArea onClick={toggleExpand}>
      <StyledCharacterSpellName>
        <Typography variant={"subtitle1"}>{spell.name}</Typography>
      </StyledCharacterSpellName>
    </CardActionArea>

    {/** More Information */}
    <Collapse in={expand}>
      <CharacterSpellInfoView
          name={spell.name}
          description={spell.description}
          level={spell.level}
          castingTime={spell.castingTime}
          range={spell.range}
          duration={spell.duration}
          components={spell.components}
          school={spell.school}/>
    </Collapse>

  </StyledCharacterSpell>
}

export default CharacterSpellView;
