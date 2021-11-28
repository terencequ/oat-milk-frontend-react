import {CSSProperties, FC, useState} from "react";
import {
  Avatar, Button,
  ButtonGroup,
  Card,
  CardActionArea, CardActionAreaProps, Collapse, Theme, Typography
} from "@mui/material";
import styled from "@emotion/styled";
import {useHistory} from "react-router-dom";
import {themeSpacing} from "../../../core/styles/GlobalStyles";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {deleteCharacter} from "../../../../redux/thunks/characterThunks";
import {useAppDispatch} from "../../../../redux/hooks";
import Visibility from "@mui/icons-material/Visibility";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import ExpandLess from "@mui/icons-material/ExpandLess";
import logo from "assets/images/logo.png";
import DeleteDialog from "../../../shared/components/dialogs/DeleteDialog";

export type CharacterInfoBasicProp = {
  characterSummary: CharacterSummaryResponse;
  style?: CSSProperties;
  isMobile?: boolean;
};

const MainContainer = styled(Card)`
  margin-top: 2vw;
  width: 100%;
`

// Summary
const SummaryDisplay = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .character-image {
    background: ${p => {
      const theme = p.theme as Theme;
      return theme.palette.primary.light;
    }};
    height: 100px;
    width: 100px;
  }
`

interface WrappedCardActionAreaProps extends CardActionAreaProps {
  isMobile?: boolean;
}
const WrappedCardActionArea: FC<WrappedCardActionAreaProps> = ({isMobile, ...props}) => {
  return <CardActionArea {...props}>{props.children}</CardActionArea>
}
const SummaryActionArea = styled(WrappedCardActionArea)<{isMobile?: boolean}>`
  display: grid;
  ${({isMobile}) => {
    console.log(isMobile)
    return isMobile 
        ? 'grid-template-columns: 130px 1fr;'
        : 'grid-template-columns: 130px 15rem 10rem 1fr;';
  }}
`

const SummaryActions = styled(ButtonGroup)`
  padding: ${themeSpacing(4)};
  align-self: center;
`

const ExpandedContents = styled.div`
  padding: ${themeSpacing(2)} ${themeSpacing(5)};
  margin-top: ${themeSpacing(2)};
`

const ExpandedCollapseButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
`

/**
 * Display a summary of a character as a vertical list item. Can be expanded to see more information, like an accordion.
 * @param characterSummary
 * @param isMobile If true, this element will only display essential info.
 * @constructor
 */
const CharacterListItem: FC<CharacterInfoBasicProp> = ({characterSummary, isMobile}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [expand, setExpand] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  /** Toggle expansion on the more info section. */
  const toggleExpand = () => {
    setExpand(!expand);
  }

  /** View character in Character page. */
  const viewThis = () => {
    history.push(`character=${characterSummary.identifier}/view`)
  }

  /** Edit character in Character page. */
  const editThis = () => {
    history.push(`character=${characterSummary.identifier}/edit`)
  }

  /** Delete character. */
  const deleteThis = async () => {
    dispatch(deleteCharacter(characterSummary.id));
  }

  return <MainContainer>
    {/** Summary Information */}
    <SummaryDisplay>
      <SummaryActionArea onClick={toggleExpand} isMobile={isMobile}>
        <Avatar variant={"rounded"} className={"character-image"} alt="Character Icon" src={logo} />
        <Typography align={"left"} variant={"h4"}>{characterSummary.name}</Typography>
        {!isMobile && <Typography align={"left"} variant={"subtitle1"}>{characterSummary.currentHitPoints}/{characterSummary.maxHitPoints} HP</Typography>}
        {!isMobile && <Typography align={"left"} variant={"subtitle1"}>Peasant, Level {characterSummary.level}</Typography>}
      </SummaryActionArea>
      <SummaryActions disableElevation={true} variant="text" color="inherit" aria-label="text primary button group">
        <Button onClick={viewThis}><Visibility/></Button>
        <Button onClick={editThis}><Edit/></Button>
        <Button onClick={() => setOpenDeleteDialog(true)} color={"error"}><Delete/></Button>
      </SummaryActions>
    </SummaryDisplay>

    {/** More Information */}
    <Collapse in={expand}>
      <ExpandedContents>
        <Typography align={"left"} variant={"h2"} gutterBottom>{characterSummary.name}</Typography>
        <Typography align={"left"} variant={"h3"} gutterBottom>Backstory</Typography>
        <Typography align={"left"} variant={"body1"} gutterBottom>{characterSummary.backstory}</Typography>
      </ExpandedContents>
      <ExpandedCollapseButton variant={"text"} color={"inherit"} onClick={toggleExpand}>
        <ExpandLess fontSize={"large"}/>
      </ExpandedCollapseButton>
    </Collapse>
    <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={deleteThis}
        subjectType={"Character Sheet"}
        subjectName={characterSummary.name}/>
  </MainContainer>;
};


export default CharacterListItem;
