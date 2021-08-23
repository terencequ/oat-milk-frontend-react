import React, {FC} from 'react';
import {Typography} from "@material-ui/core";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";
import {useAppDispatch} from "../../../redux/hooks";



const CharacterCreatePage: FC = () => {
  const dispatch = useAppDispatch();

  document.title = `Oat Milk - Create Character`
  dispatch(setBackground("inherit"));
  return <>
    <Typography variant={"h1"}>CreateCharacterPage</Typography>
  </>;
};

export default CharacterCreatePage;
