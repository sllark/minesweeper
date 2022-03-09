import React from 'react';
import {Container, Box} from '@mui/material'
import {useSelector} from "react-redux";
import {RootState} from "../store/store";


const GameGrid = (props: { openBox: Function }) => {

  const state = useSelector((store:RootState) => store.game);

  let size = '35px';
  switch (state.level) {
    case 2:
      size = '25px';
      break
    case 3:
      size = '20px';
      break;
    case 4:
      size = '20px';
      break;
    default:
      size = '35px';
  }

  return (
    <Container maxWidth={false} sx={{
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {
        state.grid.map((gridLine: string, index: number) => {
          return (
            <Box sx={{display: 'flex'}} key={index}>
              {
                gridLine.split('').map((gridItem: string, boxIndex: number) => {
                  return <Box key={boxIndex}
                              onClick={() => props.openBox(boxIndex, index)}
                              sx={{
                                bgcolor: '#cfe8fc',
                                minHeight: size,
                                minWidth: size,
                                border: 1,
                                borderColor: '#cbcbcb',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}> {gridItem !== '□' ? gridItem : ''} </Box>
                })
              }
            </Box>
          )


        })
      }
    </Container>
  );
}

export default GameGrid;
