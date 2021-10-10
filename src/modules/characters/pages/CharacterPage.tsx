import {Fade, Tab, Tabs, Typography} from "@material-ui/core";
import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterByIdentifier} from "../../../redux/thunks/characterThunks";
import styled from "@emotion/styled";
import {PageContainer, themeSpacing} from '../../core/styles/GlobalStyles';
import GenericAsyncComponent from "../../shared/components/GenericAsyncComponent";
import CharacterStats from "../components/single/stats/CharacterStats";
import CharacterStatsView from "../components/single/stats/view/CharacterStatsView";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";

const StyledTabs = styled(Tabs)`
  margin-bottom: ${themeSpacing(2)};
`

const StyledMainContainer = styled.div`
  max-width: 1200px;
  margin: auto;
`

type TParams = { id: string; };
const CharacterPage: FC = () => {

  const [tabSelection, setTabSelection] = React.useState(0);

  const { id } = useParams<TParams>();
  const dispatch = useAppDispatch();

  const currentCharacter = useAppSelector(state => state.characters.currentCharacter)

  useEffect(() => {
    dispatch(getCharacterByIdentifier(id));
  }, [dispatch, id])

  const levelString = `Level ${currentCharacter?.level.level} (${currentCharacter?.level.experience}/${currentCharacter?.level.nextLevelExperienceRequirement} XP), Peasant 1`;

  document.title = `Oat Milk - View Character | ${currentCharacter?.name ?? "Character"}`
  dispatch(setBackground("inherit"));
  return <PageContainer>
      <GenericAsyncComponent existingData={!!currentCharacter} requestId={getCharacterByIdentifier.name}>
        {
          currentCharacter && <StyledMainContainer>
            <div>
              <Typography variant={"h2"} align={"center"} gutterBottom>{currentCharacter.name}</Typography>
              <Typography variant={"h3"} align={"center"}>{levelString}</Typography>
              <StyledTabs value={tabSelection}
                          onChange={(_, newValue) => setTabSelection(newValue)} indicatorColor={"secondary"} textColor={"secondary"}>
                <Tab label={"Overall"} value={0}/>
                <Tab label={"Descriptions"} value={1}/>
              </StyledTabs>
            </div>
            <Fade in={tabSelection === 0} appear>
              <div><CharacterStats character={currentCharacter}/></div>
            </Fade>
          </StyledMainContainer>
        }
      </GenericAsyncComponent>
    </PageContainer>;
};

export default CharacterPage;
