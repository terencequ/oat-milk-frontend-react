import {CSSProperties, FC, useState} from "react";
import {
  Avatar, Button,
  ButtonGroup,
  Card,
  CardActionArea, Collapse, Theme, Typography
} from "@material-ui/core";
import styled from "@emotion/styled";
import {useHistory} from "react-router-dom";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk/dist/api";
import {Delete, Edit, ExpandLess, Visibility} from "@material-ui/icons";
import {themeSpacing} from "../../core/styles/GlobalStyles";

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
  margin-top: 2vw;
`

const ExpandedCollapseButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  background: ${props => {
    const theme = props.theme as Theme;
    return theme.palette.primary.light;
  }};
`

/**
 * Display a summary of a character as a vertical list item. Can be expanded to see more information, like an accordion.
 * @param characterSummary
 * @constructor
 */
const CharacterListItem: FC<CharacterInfoBasicProp> = ({characterSummary}) => {
  const [expand, setExpand] = useState(false);

  const history = useHistory();

  /** Toggle expansion on the more info section. */
  const toggleExpand = () => {
    setExpand(!expand);
  }

  /** View character in View Character page. */
  const view = () => {
    history.push(`character=${characterSummary.identifier}`)
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
          <Typography align={"center"} variant={"subtitle1"}>Artisan</Typography>
        </SummaryClass>
        <SummaryHealth>
          <Typography align={"center"} variant={"subtitle1"}>999/999 HP</Typography>
        </SummaryHealth>
      </SummaryActionArea>
      <SummaryActions disableElevation={true} variant="text" color="inherit" aria-label="text primary button group">
        <Button onClick={view}><Visibility/></Button>
        <Button><Edit/></Button>
        <Button color={"error"}><Delete/></Button>
      </SummaryActions>
    </SummaryDisplay>

    {/** More Information */}
    <Collapse in={expand}>
      <ExpandedContents>
        <Typography align={"left"} variant={"h2"} gutterBottom>{characterSummary.name}</Typography>
        <Typography align={"left"} variant={"h3"} gutterBottom>Backstory</Typography>
        <Typography align={"left"} variant={"body1"} gutterBottom>
          Chug used to be the best fisherman in his village. But one day, his family was killed in
          a terrible fishing accident. However, this was no accident. Chug found out that his family
          was actually murdered by man dressed up like a fish!
        </Typography>
        <Typography align={"left"} variant={"body1"} gutterBottom>
          Chug was outraged. He did not want his family to be murdered. So from that day forth,
          Chug swore an oath to search for his parents' murderer and bring him to justice.
        </Typography>
      </ExpandedContents>
      <ExpandedCollapseButton variant={"text"} color={"inherit"} onClick={toggleExpand}>
        <ExpandLess fontSize={"large"}/>
      </ExpandedCollapseButton>
    </Collapse>
  </MainContainer>;
};


export default CharacterListItem;