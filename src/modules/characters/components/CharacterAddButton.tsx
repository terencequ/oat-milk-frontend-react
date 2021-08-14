import {CSSProperties, FC} from "react";
import GenericDense from "../../shared/components/generic/GenericDense";
import AddIcon from '@material-ui/icons/Add';
import styled from "@emotion/styled";
import {useHistory} from "react-router-dom";


const StyledAddWrap = styled.div`
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  
  font-size: 1.5vw;
  letter-spacing: 0.15vw;
  text-transform: uppercase;
`;

const StyledAddIcon = styled(AddIcon)`
  font-size: 4vw;
`;



interface CharacterAddProps {
  style?: CSSProperties;
}

const CharacterAddButton: FC<CharacterAddProps> = ({style}) => {
  const history = useHistory();

  const gotoCreateNewCharacter = () => {
    return history.push("/create");
  };

  return <>
    <GenericDense style={style} action={gotoCreateNewCharacter}>
      <StyledAddWrap>
        <StyledAddIcon fontSize={"inherit"}/>
        New
      </StyledAddWrap>
    </GenericDense>
  </>;
};


export default CharacterAddButton;