import React, {FC, useEffect} from 'react';
import {Card, CardActionArea, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {StyledPageContainer, themeSpacing} from '../styles/GlobalStyles';
import {useHistory} from "react-router-dom";
import {useAppDispatch} from "../../../redux/hooks";
import {setBackground} from "../../../redux/slices/userInterfaceSlice";

const HomePageButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const HomePageCard = styled(Card)`
  max-width: 40%;
  width: 500px;
  margin: ${themeSpacing(2)};
`

const HomePageCardActions = styled(CardActionArea)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${themeSpacing(5)};
`

const HomePage: FC = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const gotoCharacters = () => {
        history.push("/characters");
    }
    useEffect(() => {
        dispatch(setBackground("inherit"));
    }, [dispatch])

    document.title = "Oat Milk - Home"
    return <StyledPageContainer>
        <Typography gutterBottom align={"center"} variant={"h2"}>Home</Typography>
        <HomePageButtons>
          <HomePageCard color={"inherit"}>
              <HomePageCardActions onClick={gotoCharacters}>
                  <Typography align={"center"} variant={"h3"}>Player</Typography>
              </HomePageCardActions>
          </HomePageCard>
          <HomePageCard color={"inherit"}>
              <HomePageCardActions>
                  <Typography align={"center"} variant={"h3"}>Dungeon Master</Typography>
              </HomePageCardActions>
          </HomePageCard>
        </HomePageButtons>
    </StyledPageContainer>;
};

export default HomePage;
