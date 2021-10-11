import {FC} from "react";
import {CharacterResponse} from "@oatmilk/oat-milk-backend-typescript-axios-sdk";

interface CharacterViewDescriptionsProps {
    character: CharacterResponse;
}

/**
 * Displays the following information for a character:
 * - Descriptions
 */
const CharacterDescriptionsView: FC<CharacterViewDescriptionsProps> = ({character}) => {
    return <>
    </>
}
export default CharacterDescriptionsView;