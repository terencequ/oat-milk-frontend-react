import {Typography} from "@mui/material";
import React, {FC, useEffect} from "react";
import {RequestStatus} from "../../../redux/actions/requestStatus";
import {useAppDispatch} from "../../../redux/hooks";
import {requestSelector} from "../../../redux/slices/requestsSlice";
import {setLoading} from "../../../redux/slices/userInterfaceSlice";
import {useHistory} from "react-router-dom";
import {logout} from "../../../redux/slices/usersSlice";

interface GenericAsyncProps {
    existingData: boolean;
    requestId: string;
    children?: JSX.Element | null;
}

const GenericAsync: FC<GenericAsyncProps> = ({existingData, requestId, children}) => {
    const dispatch = useAppDispatch();
    const { status, error } = requestSelector(requestId)();

    useEffect(() => {
        if(status === RequestStatus.InProgress){
            dispatch(setLoading(true));
        } else {
            dispatch(setLoading(false));
        }

        if(status === RequestStatus.Failure){
            const index401 = error?.indexOf("status code 401") ?? -1;
            if(index401 !== -1){
                dispatch(logout());
            }
        }

    }, [dispatch, error, status])

    if(status === RequestStatus.Success || status === RequestStatus.InProgress){
        return <div>
            {children}
        </div>
    } else {
        return <>
            <Typography variant={"h2"} align={"center"} gutterBottom>Uh oh! An error has occurred.</Typography>
            <Typography variant={"h3"} align={"center"}>{error}</Typography>
        </>
    }
}

export default GenericAsync;
