import {CSSProperties, FC} from "react";
import styled from "@emotion/styled";
import {Card, CardActionArea, CardContent} from "@material-ui/core";



const StyledCard = styled(Card)`
  width: 15vw;
  height: 15vw;
  
  margin: 0.5vw 1vw;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: inherit;
`;

const StyledCardActionArea = styled(CardActionArea)`
  width: 100%;
  height: 100%;
`;


interface GenericDenseProps {
  action?: () => void;
  style?: CSSProperties;
}

const GenericDense: FC<GenericDenseProps> = ({children, action, style}) => {
  const contents = <StyledCardContent>
    {children}
  </StyledCardContent>;

  return <>
    <StyledCard variant={"outlined"} style={style}>
      {action !== undefined
        ? <StyledCardActionArea onClick={action}>
          {contents}
        </StyledCardActionArea>
        : contents}
    </StyledCard>
  </>;
};


export default GenericDense;