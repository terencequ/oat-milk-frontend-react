import {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {getRandomInt} from "../../../characters/helpers/NumberHelpers";
import {getModifierAsString} from "../../../characters/helpers/CharacterStatHelpers";

export interface DiceDialogProps {
    title: string,
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    modifier: number;
    dice: number;
}

const DiceDialog: FC<DiceDialogProps> = ({title, open, setOpen, modifier, dice}) => {

    const [diceRoll, setDiceRoll] = useState(0);

    const reroll = useCallback(() => {
        setDiceRoll(getRandomInt(1, dice+1));
    }, [dice])

    useEffect(() => {
        if(open){
            reroll();
        }
    }, [dice, open, reroll])

    return <Dialog
        open={open}
        onClose={() => setOpen(false)}
    >
        <DialogTitle>
            {title}
        </DialogTitle>
        <DialogContent sx={{width: 400}}>
            You rolled a {diceRoll+modifier}! (Roll: {diceRoll}, Total modifier: {getModifierAsString(modifier)})
        </DialogContent>
        <DialogActions>
            <Button onClick={() => reroll()}>Reroll</Button>
            <Button color={"error"} onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
    </Dialog>
}

export default DiceDialog;
