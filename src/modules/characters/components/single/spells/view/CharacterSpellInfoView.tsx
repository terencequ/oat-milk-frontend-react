import {FC} from "react";
import {StyledCharacterSpellContents, StyledCharacterSpellContentsProperty} from "../CharacterSpellsStyles";
import {Divider, Typography} from "@mui/material";

const CharacterSpellPropertyView: FC<{title: string, value: string}> = ({title, value}) => (
    <StyledCharacterSpellContentsProperty>
        <Typography variant="body2"><b>{title.toUpperCase()}</b></Typography>
        <Typography variant="body1">{value}</Typography>
    </StyledCharacterSpellContentsProperty>
);

interface CharacterSpellInfoViewProps {
    name: string;
    description: string;
    level: number;
    castingTime: string;
    rangeOrArea: string;
    duration: string;
    components: string;
    school: string;
}

const CharacterSpellInfoView: FC<CharacterSpellInfoViewProps> = (props) => {
    return <StyledCharacterSpellContents>
        <Typography variant={"h2"} gutterBottom>{props.name}</Typography>
        <Divider sx={{marginBottom: 2}}/>
        <div className={"properties"}>
            <CharacterSpellPropertyView title={"Level"} value={props.level.toString()}/>
            <CharacterSpellPropertyView title={"Casting Time"} value={props.castingTime}/>
            <CharacterSpellPropertyView title={"Range / Area"} value={props.rangeOrArea}/>
            <CharacterSpellPropertyView title={"Duration"} value={props.duration}/>
            <CharacterSpellPropertyView title={"Components"} value={props.components}/>
            <CharacterSpellPropertyView title={"School"} value={props.school}/>
        </div>
        <Divider sx={{marginBottom: 2}}/>
        <Typography sx={{wordWrap: "break-word", whiteSpace: "pre-line"}}>{props.description}</Typography>
    </StyledCharacterSpellContents>
}

export default CharacterSpellInfoView;
