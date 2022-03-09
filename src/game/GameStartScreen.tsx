import React from 'react';
import {Container, Typography, Button} from '@mui/material'

import GameLevelSelector from "./GameLevelSelector";
import {useDispatch} from "react-redux";
import {setStart} from "./gameReducers";


const GameStartScreen = () => {

  const dispatch = useDispatch();

  return (
    <Container maxWidth={false} sx={{
      minHeight: '90vh',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Typography component='h1' variant='h4'>
        Welcome to Minesweeper
      </Typography>

      <GameLevelSelector/>

      <Button
        variant="contained"
        size="large"
        onClick={() => dispatch(setStart(true))}
      >
        Play Game
      </Button>

    </Container>
  );
}

export default GameStartScreen;
