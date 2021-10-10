import {FC} from "react";
import Add from "@mui/icons-material/Add";
import {createCharacter} from "../../../../redux/thunks/characterThunks";
import {useAppDispatch} from "../../../../redux/hooks";
import FloatingActionList, {FloatingActionModel} from "../../../shared/components/FloatingActionList";

const CharacterListActions: FC = () => {
    const dispatch = useAppDispatch();
    const actions: FloatingActionModel[] = [
        {
            action: () => {
                dispatch(createCharacter({
                    name: "new character",
                    attributes: null,
                    abilityScores: null,
                    abilityScoreProficiencies: null,
                    descriptions: null
                }));
            },
            icon: <Add/>,
            text: "Create Character"
        }
    ]

    return <FloatingActionList actions={actions}/>
}

export default CharacterListActions;