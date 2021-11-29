import {FC, useState} from "react";
import Add from "@mui/icons-material/Add";
import {createCharacter} from "../../../../redux/thunks/characterThunks";
import {useAppDispatch} from "../../../../redux/hooks";
import FloatingActionList, {FloatingActionModel} from "../../../shared/components/FloatingActionList";
import CharacterCreateDialog from "./dialogs/CharacterCreateDialog";

const CharacterListActions: FC = () => {
    const [open, setOpen] = useState(false);

    const actions: FloatingActionModel[] = [
        {
            action: () => {
                setOpen(true);
            },
            icon: <Add/>,
            text: "Create Character"
        }
    ]

    return <>
        <CharacterCreateDialog open={open} onClose={() =>  setOpen(false)}/>
        <FloatingActionList actions={actions}/>
    </>
}

export default CharacterListActions;
