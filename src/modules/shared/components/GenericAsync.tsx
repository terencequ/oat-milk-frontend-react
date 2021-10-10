import {Typography} from "@mui/material";
import React, {FC} from "react";
import {RequestStatus} from "../../../redux/actions/requestStatus";
import {useAppDispatch} from "../../../redux/hooks";
import {requestSelector} from "../../../redux/slices/requestsSlice";
import {setLoading} from "../../../redux/slices/userInterfaceSlice";

interface GenericAsyncProps {
    existingData: boolean;
    requestId: string;
    children?: JSX.Element | null;
}

const GenericAsync: FC<GenericAsyncProps> = ({existingData, requestId, children}) => {
    const dispatch = useAppDispatch();
    const { status, error } = requestSelector(requestId)();
    if(status === RequestStatus.InProgress){
        dispatch(setLoading(true));
    } else {
        dispatch(setLoading(false));
    }

    return <div>
        {
            (status === RequestStatus.Success || status === RequestStatus.InProgress)
            && children
        }
        {
            status === RequestStatus.Failure &&
            <>
                <Typography variant={"h2"} align={"center"} gutterBottom>Uh oh! An error has occurred.</Typography>
                <Typography variant={"h3"} align={"center"}>{error}</Typography>
            </>
        }
    </div>;
}

export default GenericAsync;