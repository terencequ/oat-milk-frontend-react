import styled from "@emotion/styled";
import {Theme} from "@mui/material";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip"
import {TooltipProps} from "@mui/material/Tooltip/Tooltip";

const ErrorTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))((props) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: (props.theme as Theme).palette.error.main,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: (props.theme as Theme).palette.error.main,
        color: (props.theme as Theme).palette.error.contrastText,
    },
}));

export default ErrorTooltip;