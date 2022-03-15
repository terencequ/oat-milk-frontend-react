import {FC} from "react";
import {StyledCharacterSpellContents, StyledCharacterSpellContentsProperty} from "../CharacterSpellsStyles";
import {Divider, Typography} from "@mui/material";
import {
    SpellCastingTimeRequest,
    SpellComponentsRequest,
    SpellDurationRequest,
    SpellRangeRequest,
    SpellSchool
} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {
    getCastingTimeAsString,
    getComponentsAsString,
    getDurationAsString,
    getRangeAsString
} from "../../../../helpers/SpellHelpers";

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
    castingTime: SpellCastingTimeRequest | undefined;
    range: SpellRangeRequest | undefined;
    duration: SpellDurationRequest | undefined;
    components: SpellComponentsRequest | undefined;
    school: SpellSchool;
}

const CharacterSpellInfoView: FC<CharacterSpellInfoViewProps> = (props) => {
    return <StyledCharacterSpellContents>
        <Typography variant={"h2"} gutterBottom>{props.name}</Typography>
        <Divider sx={{marginBottom: 2}}/>
        <div className={"properties"}>
            <CharacterSpellPropertyView title={"Level"} value={props.level.toString()}/>
            <CharacterSpellPropertyView title={"Casting Time"} value={getCastingTimeAsString(props.castingTime)}/>
            <CharacterSpellPropertyView title={"Range / Area"} value={getRangeAsString(props.range)}/>
            <CharacterSpellPropertyView title={"Duration"} value={getDurationAsString(props.duration)}/>
            <CharacterSpellPropertyView title={"Components"} value={getComponentsAsString(props.components)}/>
            <CharacterSpellPropertyView title={"School"} value={props.school}/>
        </div>
        <Divider sx={{marginBottom: 2}}/>
        <Typography sx={{wordWrap: "break-word", whiteSpace: "pre-line"}}>{props.description}</Typography>
    </StyledCharacterSpellContents>
}

export default CharacterSpellInfoView;
