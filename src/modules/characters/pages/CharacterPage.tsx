import {Fade, Tab, Tabs, Typography} from "@material-ui/core";
import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterByIdentifier} from "../../../redux/thunks/characterThunks";
import styled from "@emotion/styled";
import {PageContainer, themeSpacing} from '../../core/styles/GlobalStyles';
import {requestSelector} from "../../../redux/slices/requestsSlice";
import GenericAsyncComponent from "../../shared/components/GenericAsyncComponent";
import CharacterStatsView from "../components/single/CharacterStatsView";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";

const StyledTabs = styled(Tabs)`
  margin-bottom: ${themeSpacing(2)};
`

const StyledTabPanel = styled(Fade)`
`

type TParams = { id: string; };
const CharacterPage: FC = () => {

  const [tabSelection, setTabSelection] = React.useState(0);

  const { id } = useParams<TParams>();
  const dispatch = useAppDispatch();
  const { status, error } = requestSelector(getCharacterByIdentifier.name)();

  const currentCharacter = useAppSelector(state => state.characters.currentCharacter)

  useEffect(() => {
    dispatch(getCharacterByIdentifier(id));
  }, [dispatch, id])

  document.title = `Oat Milk - View Character | ${currentCharacter?.name ?? "Character"}`
  dispatch(setBackground("inherit"));
  return <PageContainer>
      <GenericAsyncComponent existingData={!!currentCharacter} requestId={getCharacterByIdentifier.name}>
        {
          currentCharacter && <div>
            <Typography variant={"h1"} align={"center"}>{currentCharacter.name}</Typography>
            <StyledTabs value={tabSelection}
                        onChange={(_, newValue) => setTabSelection(newValue)} indicatorColor={"secondary"} textColor={"secondary"}>
              <Tab label={"Stats"} value={0}/>
              <Tab label={"Descriptions"} value={1}/>
            </StyledTabs>
            <StyledTabPanel in={tabSelection === 0} appear>
              <div><CharacterStatsView character={currentCharacter}/></div>
            </StyledTabPanel>
          </div>
        }
      </GenericAsyncComponent>
    </PageContainer>;
};

export default CharacterPage;
