import {CSSProperties, FC} from "react";
import GenericDense from "../GenericDense";
import AddIcon from '@material-ui/icons/Add';
import styled from "@emotion/styled";
import {useHistory} from "react-router-dom";



const StyledAddWrap = styled.div`
  width: 100%;
  height: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  font-size: 4vw;
`;



interface CharacterAddProps {
  style?: CSSProperties;
}

const CharacterAdd: FC<CharacterAddProps> = ({style}) => {
  const history = useHistory();

  const gotoCreateNewCharacter = () => {
    return history.push("/create");
  };

  return <>
    <GenericDense style={style} action={gotoCreateNewCharacter}>
      <StyledAddWrap>
        <AddIcon fontSize={"inherit"}/>
      </StyledAddWrap>
    </GenericDense>
  </>;
};


export default CharacterAdd;