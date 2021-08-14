import React, {FC} from 'react';
import {CardContent, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import CharacterListView from "../../characters/components/CharacterListView";


const MainContainer = styled.section`
  margin-bottom: 2vw;
`;

const HeroContainer = styled.div`
  margin-top: 4vw;
  margin-bottom: 4vw;
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  img {
    width: 256px;
  }
`

const Content = styled(CardContent)`
  display: flex;
  flex-flow: column;
`;

const HomePage: FC = () => {
  return <MainContainer>
      <HeroContainer>
        <Typography variant={"h1"}>Home Page</Typography>
      </HeroContainer>

      <Content>
        <CharacterListView/>
      </Content>
    </MainContainer>;
};

export default HomePage;
