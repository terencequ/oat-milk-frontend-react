import {FC} from "react";
import styled from "@emotion/styled";
import {SpellRangeRequest} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

const StyledCastingTime = styled.div`
  display: flex;
  flex-direction: column;
`

interface SpellRangeEditProps {
    range: SpellRangeRequest;
    setRange: (range: SpellRangeRequest) => void;
}

const SpellRangeEdit : FC<SpellRangeEditProps> = ({range, setRange}) => {
    return <StyledCastingTime>
        <></>
    </StyledCastingTime>
}

export default SpellRangeEdit;
