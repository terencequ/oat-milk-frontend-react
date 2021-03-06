import {Edit, Save, Visibility} from "@mui/icons-material";
import {Fade, Tab, Tabs} from "@mui/material";
import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {mapCharacterResponseToRequest} from "../../../api/helpers/characterMapping";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {anyCurrentEditCharacterFormErrors, setCurrentEditCharacter} from "../../../redux/slices/characterSlice";
import {getCharacterByIdentifierAsCurrent, updateCharacter} from "../../../redux/thunks/characterThunks";
import styled from "@emotion/styled";
import {StyledPageContainer, themeSpacing} from '../../core/styles/GlobalStyles';
import FloatingActionList, {FloatingActionModel} from "../../shared/components/FloatingActionList";
import GenericAsync from "../../shared/components/GenericAsync";
import CharacterStats from "../components/single/stats/CharacterStats";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";
import CharacterSummary from "../components/single/summary/CharacterSummary";
import CharacterDescriptions from "../components/single/descriptions/CharacterDescriptions";
import CharacterSpells from "../components/single/spells/CharacterSpells";

const StyledTabs = styled(Tabs)`
  margin-bottom: ${themeSpacing(2)};
`

const StyledMainContainer = styled.div`
  max-width: 1200px;
  margin: auto;
`

type TParams = { id: string; };

/**
 * Main character page. Handles viewing, creating and editing a single character.
 * @constructor
 */
const CharacterPage: FC<{editModeStart: boolean}> = ({editModeStart}) => {
  const [editMode, setEditMode] = useState(editModeStart);
  const [tabSelection, setTabSelection] = React.useState(0);

  const { id } = useParams<TParams>();
  const dispatch = useAppDispatch();

  const currentCharacter = useAppSelector(state => state.characters.currentCharacter);
  const currentEditCharacter = useAppSelector(state => state.characters.currentEditCharacter);

  const anyErrors = anyCurrentEditCharacterFormErrors()();

  /**
   * Create request from current character response (API's character).
   */
  const refreshEditCharacterAsync = async () => {
    if(!!currentCharacter){
      await dispatch(setCurrentEditCharacter(mapCharacterResponseToRequest(currentCharacter)));
    }
  }

  /**
   * Save "edit character" model to the API.
   */
  const saveEditCharacterAsync = async () => {
    if(!!currentCharacter && !!currentEditCharacter){
      console.log("Saving character")
      await dispatch(updateCharacter(currentCharacter.id, currentEditCharacter));
      await dispatch(getCharacterByIdentifierAsCurrent(currentCharacter.identifier));
      setEditMode(false);
    }
  }

  /**
   * Reset current character for URL (by ID) on component mount, or ID change.
   */
  useEffect(() => {
    dispatch(getCharacterByIdentifierAsCurrent(id));
  }, [dispatch, id])

  // Floating actions
  const actions: FloatingActionModel[] = [];
  if(editMode){
    actions.push({
      action: saveEditCharacterAsync,
      icon: <Save/>,
      color: "primary",
      text: "Save",
      disabled: anyErrors
    })
  }
  actions.push({
    action: async () => {
      setEditMode(false)
      await refreshEditCharacterAsync();
    },
    icon: <Visibility/>,
    text: "View"
  })
  actions.push({
    action: async () => {
      setEditMode(true)
      await refreshEditCharacterAsync();
    },
    icon: <Edit/>,
    text: "Edit"
  })

  // Background and title
  document.title = `Oat Milk - View Character | ${currentCharacter?.name ?? "Character"}`
  dispatch(setBackground("inherit"));

  return <StyledPageContainer>
      <GenericAsync existingData={!!currentCharacter} requestId={getCharacterByIdentifierAsCurrent.name}>
        {
          currentCharacter && currentEditCharacter && <StyledMainContainer>
            <FloatingActionList actions={actions} active={editMode ? 2 : 0}/>
            <div>
              <CharacterSummary editMode={editMode}/>
              <StyledTabs value={tabSelection}
                          onChange={(_, newValue) => setTabSelection(newValue)} indicatorColor={"secondary"} textColor={"secondary"}>
                <Tab label={"Overall"} value={0}/>
                <Tab label={"Descriptions"} value={1}/>
                <Tab label={"Spells"} value={2}/>
              </StyledTabs>
            </div>
            <Fade in={tabSelection === 0} appear>
              <div hidden={tabSelection !== 0}>
                <CharacterStats editMode={editMode}/>
              </div>
            </Fade>
            <Fade in={tabSelection === 1} appear>
              <div hidden={tabSelection !== 1}>
                <CharacterDescriptions editMode={editMode}/>
              </div>
            </Fade>
            <Fade in={tabSelection === 2} appear>
              <div hidden={tabSelection !== 2}>
                <CharacterSpells editMode={editMode}/>
              </div>
            </Fade>
          </StyledMainContainer>
        }
      </GenericAsync>
    </StyledPageContainer>;
};

export default CharacterPage;
