import {CSSProperties, FC, useState} from "react";
import {
  Avatar, Button,
  ButtonGroup,
  Card,
  CardActionArea, CardActions, Collapse, Divider, Grid,
  IconButton, LinearProgress,
  Theme, Tooltip,
  Typography
} from "@material-ui/core";
import styled from "@emotion/styled";
import {useHistory} from "react-router-dom";
import {CharacterSummaryResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk/dist/api";
import {Build, Delete, Edit, ExpandLess, Visibility} from "@material-ui/icons";
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
  padding: ${themeSpacing(5)};
  align-self: center;
`

// Expanded
const ExpandedContainer = styled(Collapse)`

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
 * Display a summary of a character (with expandable information) in a vertical list item.
 * @param characterSummary
 * @constructor
 */
const CharacterListItem: FC<CharacterInfoBasicProp> = ({characterSummary}) => {
  const [expand, setExpand] = useState(false);

  const levelProgress = () => {
    const exp = characterSummary.experience ?? 0;
    const lastExpRequirement = characterSummary.previousLevelExperienceRequirement ?? 0;
    const nextExpRequirement = characterSummary.nextLevelExperienceRequirement ?? 0;

    if(nextExpRequirement === -1){ // Reached max level
      return 1;
    }

    const flatCurrent = exp - lastExpRequirement;
    const flatNext = nextExpRequirement - lastExpRequirement;

    if (flatNext === 0) return 1;

    return flatCurrent / flatNext;
  };

  const history = useHistory();

  // Get a "30/300xp" style string
  const getExpText = () => {
    const currentExp = characterSummary.experience ?? 0;
    const nextExp = characterSummary.nextLevelExperienceRequirement ?? 0;
    let currentExpString = `${currentExp}`;
    let nextExpString = `${nextExp}`;
    if(nextExp === -1){
      nextExpString = "MAX";
    }
    return `${currentExpString}/${nextExpString}`;
  }

  // Toggle expansion on the more info section
  const toggleExpand = () => {
    setExpand(!expand);
  }

  // View character in View Character page
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
      <SummaryActions variant="text" color="inherit" aria-label="text primary button group">
        <IconButton><Visibility/></IconButton>
        <IconButton><Edit/></IconButton>
        <IconButton color={"error"}><Delete/></IconButton>
      </SummaryActions>
    </SummaryDisplay>

    {/** More Information */}
    <ExpandedContainer in={expand}>
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
    </ExpandedContainer>
  </MainContainer>;
};


export default CharacterListItem;