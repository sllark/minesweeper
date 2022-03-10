import React from 'react';
import {Container, Typography, Modal, Box, Button} from '@mui/material'

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import GameLevelSelector from "./GameLevelSelector";
import {setStart, setLoading} from "./gameReducers";
import {PlayArrow} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";


const GridHeader = () => {

  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state.game)

  if (!state.gameOver && !state.isLoading) return null;

  return (

    <Box
      sx={{
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column'
      }}
    >
      <Typography variant='h4' fontWeight='bold' color='red'>
        Game Over
      </Typography>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
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
            dispatch(setStart(true));
            dispatch(setLoading(true));
          }}
        >
          Play Again
        </LoadingButton>




      </Box>

    </Box>
  );
}

export default GridHeader;
