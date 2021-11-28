import {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    subjectType: string; // e.g. "Spell"
    subjectName: string; // e.g. "Fireball"
}

const DeleteDialog: FC<DeleteDialogProps> = (props) => {
    return <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>
            <Typography variant={"h3"}>Delete {props.subjectType}</Typography>
        </DialogTitle>
        <DialogContent>
            <Typography>Are you sure you want to delete {props.subjectType} "{props.subjectName}"?</Typography>
        </DialogContent>
        <DialogActions>
            <Button color={"secondary"} onClick={props.onClose}>Cancel</Button>
            <Button color={"error"} onClick={() => {
                props.onDelete();
                props.onClose();
            }}>Delete</Button>
        </DialogActions>
    </Dialog>
}
export default DeleteDialog;
