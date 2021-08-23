import {CSSProperties, FC, useState} from "react";
import {
  Avatar, Button,
  ButtonGroup,
  Card,
  CardActionArea, Collapse, Theme, Typography
} from "@material-ui/core";
import styled from "@emotion/styled";
import {useHistory} from "react-router-dom";
import {Delete, Edit, ExpandLess, Visibility} from "@material-ui/icons";
import {themeSpacing} from "../../core/styles/GlobalStyles";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {deleteCharacter} from "../../../redux/thunks/characterThunks";
import {useAppDispatch} from "../../../redux/hooks";

export type CharacterInfoBasicProp = {
  characterSummary: CharacterSummaryResponse;
  style?: CSSProperties;
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

const SummaryActionArea = styled(CardActionArea)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`

const SummaryImage = styled.div`
  padding: ${themeSpacing(1)};
`

const SummaryNameAndLevel = styled.div`
  margin-left: ${themeSpacing(2)};
  display: flex;
  align-self: center;
  flex-direction: column;
`

const SummaryClass = styled.div`
  margin-left: auto;
  margin-right: auto;
  align-self: center;
`

const SummaryHealth = styled.div`
  margin-right: ${themeSpacing(3)};
  display: flex;
  align-self: center;
  flex-direction: column;
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
 * @constructor
 */
const CharacterListItem: FC<CharacterInfoBasicProp> = ({characterSummary}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [expand, setExpand] = useState(false);

  /** Toggle expansion on the more info section. */
  const toggleExpand = () => {
    setExpand(!expand);
  }

  /** View character in View Character page. */
  const viewThis = () => {
    history.push(`character=${characterSummary.identifier}`)
  }

  /** View character in View Character page. */
  const deleteThis = async () => {
    dispatch(deleteCharacter(characterSummary.id));
  }

  return <MainContainer>
    {/** Summary Information */}
    <SummaryDisplay>
      <SummaryActionArea onClick={toggleExpand}>
        <SummaryImage>
          <Avatar variant={"rounded"} className={"character-image"} alt="Character Icon" src="./images/logo.png" />
        </SummaryImage>
        <SummaryNameAndLevel>
          <Typography align={"left"} variant={"h4"}>{characterSummary.name}</Typography>
          <Typography align={"left"} variant={"subtitle1"}>Level {characterSummary.level}</Typography>
        </SummaryNameAndLevel>
        <SummaryClass>
          <Typography align={"center"} variant={"subtitle1"}>Unknown Class</Typography>
        </SummaryClass>
        <SummaryHealth>
          <Typography align={"center"} variant={"subtitle1"}>{characterSummary.currentHitPoints}/{characterSummary.maxHitPoints} HP</Typography>
        </SummaryHealth>
      </SummaryActionArea>
      <SummaryActions disableElevation={true} variant="text" color="inherit" aria-label="text primary button group">
        <Button onClick={viewThis}><Visibility/></Button>
        <Button><Edit/></Button>
        <Button onClick={deleteThis} color={"error"}><Delete/></Button>
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
  </MainContainer>;
};


export default CharacterListItem;