import React, {FC} from 'react';
import {CardContent, Divider, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import CharacterListView from "../../characters/components/CharacterListView";
import { HeroContainer, PageContainer } from '../styles/GlobalStyles';

const PageSection = styled.div`
  margin-top: 1vw;
`

const HomePage: FC = () => {
  return <PageContainer>
      <HeroContainer>
        <Typography variant={"h1"}>Welcome to Oat Milk</Typography>
      </HeroContainer>

      <PageSection>
          <Typography align={"left"} variant={"h3"}>Characters</Typography>
          <Divider/>
      </PageSection>

      <PageSection>
          <Typography align={"left"} variant={"h3"}>Campaigns</Typography>
          <Divider/>
      </PageSection>
    </PageContainer>;
};

export default HomePage;
