import styled from "@emotion/styled";
import {Button} from "@mui/material";
import {StyledFloatingAction, themeSpacing} from "modules/core/styles/GlobalStyles";
import {FC, ReactElement} from "react";

const StyledButton = styled(Button)`
  margin: ${themeSpacing(2)};
`

export interface FloatingActionModel {
    action: () => void;
    icon: ReactElement;
    color?: "primary" | "secondary";
    text: string;
    disabled?: boolean;
}

export interface FloatingActionListProps {
    /**
     * Index of the action that is currently active.
     * If null, no action will be active.
     */
    active?: number | null;

    /**
     * List of actions on the floating action list.
     */
    actions: FloatingActionModel[];
}

/**
 * A list of actions which will float in the bottom right of the screen.
 */
const FloatingActionList: FC<FloatingActionListProps> = (props) => {
    return <StyledFloatingAction>
        {props.actions.map((value, index) => {
            return <StyledButton
                onClick={value.action}
                color={value.color ?? "secondary"}
                variant={"contained"}
                disabled={props.active === index || value.disabled === true}
                startIcon={value.icon}
            >
                {value.text}
            </StyledButton>
        })}
    </StyledFloatingAction>;
}

export default FloatingActionList;