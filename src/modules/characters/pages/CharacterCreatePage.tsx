import React, {FC} from 'react';
import {Typography} from "@mui/material";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";
import {useAppDispatch} from "../../../redux/hooks";



const CharacterCreatePage: FC = () => {
  const dispatch = useAppDispatch();

  document.title = `Oat Milk - Create Character`
  dispatch(setBackground("inherit"));
  return <>
    <Typography variant={"h2"}>CreateCharacterPage</Typography>
  </>;
};

export default CharacterCreatePage;
