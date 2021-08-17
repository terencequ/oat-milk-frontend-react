import React, {FC} from 'react';
import {Button, Card, CardActionArea, CardMedia, Typography} from "@material-ui/core";
import styled from "@emotion/styled";
import {HeroContainer, PageContainer, themeSpacing} from '../styles/GlobalStyles';
import {useHistory} from "react-router-dom";
import {ListAlt, PeopleAlt} from "@material-ui/icons";

const HomePageHeroContainer = styled.div`
  margin-top: ${themeSpacing(10)};
  margin-bottom: ${themeSpacing(4)};
`

const HomePageButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const HomePageCard = styled(Card)`
  margin: ${themeSpacing(3)};
  width: 100%;
`

const HomePageCardActions = styled(CardActionArea)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 40vh;
  .icon {
    font-size: 5rem;
    margin: ${themeSpacing(1)};
  }
`

const HomePage: FC = () => {

    const history = useHistory();
    const gotoCharacters = () => {
        history.push("/characters");
    }

    return <PageContainer>
      <HomePageHeroContainer>
          <Typography align={"center"} variant={"h2"}>Where would you like to go?</Typography>
      </HomePageHeroContainer>

      <HomePageButtons>
          <HomePageCard color={"inherit"}>
              <HomePageCardActions onClick={gotoCharacters}>
                  <Typography align={"center"} variant={"h3"}>Characters</Typography>
                  <ListAlt className={"icon"}/>
              </HomePageCardActions>
          </HomePageCard>
          <HomePageCard color={"inherit"}>
              <HomePageCardActions>
                  <Typography align={"center"} variant={"h3"}>Campaigns</Typography>
                  <PeopleAlt className={"icon"}/>
              </HomePageCardActions>
          </HomePageCard>
      </HomePageButtons>
    </PageContainer>;
};

export default HomePage;
