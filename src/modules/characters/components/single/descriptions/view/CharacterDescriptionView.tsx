import {FC} from "react";
import {Typography} from "@mui/material";
import {CharacterDescriptionResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";
import {StyledDescription} from "../CharacterDescriptionsStyles";


const CharacterDescriptionView: FC<{description: CharacterDescriptionResponse | null, columnWidth?: number}> =
  ({description, columnWidth}) => {
  return <StyledDescription sx={{gridColumn: `span ${columnWidth}`}}>
    <Typography variant={"subtitle1"}>{description?.name ?? ""}</Typography>
    <Typography sx={{height: '100%', wordWrap: "break-word", whiteSpace: "pre-line"}}
                display={"inline"}
                variant={"body1"}>{description?.value ?? ""}</Typography>
  </StyledDescription>
}

export default CharacterDescriptionView;