import React from 'react';
import {Container, Typography, Button} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import {PlayArrow} from '@mui/icons-material';


import GameLevelSelector from "./GameLevelSelector";
import {useDispatch, useSelector} from "react-redux";
import {setStart, setLoading} from "./gameReducers";
import {RootState} from "../store/store";

import isConnectionReady from "../common/isConnectionReady";

const GameStartScreen = () => {

  const state = useSelector((state: RootState) => state.game)
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

      <LoadingButton
        loading={state.isLoading}
        loadingPosition="end"
        variant="contained"
        endIcon={<PlayArrow/>}
        sx={{
          pr:2
        }}
        onClick={() => {
          if (isConnectionReady()){
            dispatch(setStart(true));
            dispatch(setLoading(true));
          }
        }}
      >
        Play Game
      </LoadingButton>

    </Container>
  );
}

export default GameStartScreen;
