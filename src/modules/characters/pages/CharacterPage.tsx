import {Edit, Restore, Save} from "@mui/icons-material";
import {Fade, Tab, Tabs} from "@mui/material";
import {CharacterRequest, CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {getCharacterByIdentifier, updateCharacter} from "../../../redux/thunks/characterThunks";
import styled from "@emotion/styled";
import {StyledPageContainer, themeSpacing} from '../../core/styles/GlobalStyles';
import FloatingActionList, {FloatingActionModel} from "../../shared/components/FloatingActionList";
import GenericAsync from "../../shared/components/GenericAsync";
import CharacterStats from "../components/single/stats/CharacterStats";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";
import CharacterViewSummary from "../components/single/summary/view/CharacterViewSummary";

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
const CharacterPage: FC = () => {
  const [editCharacter, setEditCharacter] = useState<CharacterRequest | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [tabSelection, setTabSelection] = React.useState(0);

  const { id } = useParams<TParams>();
  const dispatch = useAppDispatch();

  const currentCharacter = useAppSelector(state => state.characters.currentCharacter)

  /**
   * Create request from current character response (API's character).
   */
  const createEditCharacter = useCallback((): CharacterRequest | null  => !currentCharacter
      ? null
      : {
        name: currentCharacter.name,
        abilityScores: currentCharacter.abilityScores,
        abilityScoreProficiencies: currentCharacter.abilityScores.flatMap(as => as.proficiencies.map(p => ({
          abilityScoreId: as.id,
          ...p
        }))),
        attributes: currentCharacter.attributes,
        descriptions: currentCharacter.descriptions
      }, [currentCharacter]);

  /**
   * Save "edit character" model to the API.
   */
  const saveCharacter = async () => {
    if(!!currentCharacter && !!editCharacter){
      console.log("Saving character")
      await dispatch(updateCharacter(currentCharacter.id, editCharacter));
      await dispatch(getCharacterByIdentifier(currentCharacter.identifier));
      setEditMode(false);
    }
  }

  /**
   * Reset current character for URL (by ID) on component mount, or ID change.
   */
  useEffect(() => {
    dispatch(getCharacterByIdentifier(id));
  }, [dispatch, id])

  /**
   * Reset the edit character every time the current character changes.
   */
  useEffect(() => {
    setEditCharacter(createEditCharacter());
  }, [createEditCharacter])

  // Floating actions
  const actions: FloatingActionModel[] = [];
  if(editMode){
    actions.push({
      action: () => {setEditCharacter(createEditCharacter())},
      icon: <Restore/>,
      color: "primary",
      text: "Reset Stats"
    });
    actions.push({
      action: () => saveCharacter(),
      icon: <Save/>,
      color: "primary",
      text: "Save Stats"
    })
  }
  actions.push({
    action: () => setEditMode(false),
    icon: <Edit/>,
    text: "View Stats"
  })
  actions.push({
    action: () => setEditMode(true),
    icon: <Edit/>,
    text: "Edit Stats"
  })

  // Background and title
  document.title = `Oat Milk - View Character | ${currentCharacter?.name ?? "Character"}`
  dispatch(setBackground("inherit"));

  return <StyledPageContainer>
      <GenericAsync existingData={!!currentCharacter} requestId={getCharacterByIdentifier.name}>
        {
          currentCharacter && editCharacter && <StyledMainContainer>
            <FloatingActionList actions={actions} active={editMode ? 3 : 0}/>
            <div>
              <CharacterViewSummary character={currentCharacter}/>
              <StyledTabs value={tabSelection}
                          onChange={(_, newValue) => setTabSelection(newValue)} indicatorColor={"secondary"} textColor={"secondary"}>
                <Tab label={"Overall"} value={0}/>
                <Tab label={"Descriptions"} value={1}/>
              </StyledTabs>
            </div>
            <Fade in={tabSelection === 0} appear>
              <div>
                <CharacterStats
                  character={currentCharacter}
                  editCharacter={editCharacter}
                  setEditCharacter={setEditCharacter}
                  editMode={editMode}/>
              </div>
            </Fade>
          </StyledMainContainer>
        }
      </GenericAsync>
    </StyledPageContainer>;
};

export default CharacterPage;
