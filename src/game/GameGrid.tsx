import React, {memo, useEffect} from 'react';
import {Container, Box} from '@mui/material'
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

import GridHeader from "./GridHeader";

import boxBG from '../assets/img/closed.svg'

const GameGrid = (props: { openBox: Function }) => {

  const state = useSelector((store: RootState) => store.game);


  let size = '35px', fontSize = '20px';
  let level = state.level;
  if (state.gameOver || state.isLoading) level = state.levelBeforeGameOver;
  switch (level) {
    case 2:
      size = '25px';
      break
    case 3:
      size = '20px';
      fontSize = '16px';
      break;
    case 4:
      size = '20px';
      fontSize = '10px';
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
      <GridHeader/>

      {
        state.grid.map((gridLine: string, index: number) => {
          return (
            <Box sx={{display: 'flex'}} key={index}>
              {
                gridLine.split('').map((gridItem: string, boxIndex: number) => {

                  const style = {
                    backgroundImage: `url(${boxBG})`,
                    backgroundSize: 'cover',
                    bgcolor: '#c6c6c6',
                    minHeight: size,
                    minWidth: size,
                    border: 1,
                    borderColor: '#808080',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'blue',
                    fontSize
                  };

                  if (gridItem !== '□') {
                    style.backgroundImage = '';
                    style.bgcolor = '#c6c6c6';
                  }

                  if (gridItem === '*') {
                    style.bgcolor = '#f40101';
                    style.color = '#000000';
                  } else if (gridItem === '2') {
                    style.color = 'green'
                  } else if (gridItem === '3') {
                    style.color = '#f52930'
                  }

                  return <Box key={boxIndex}
                              onClick={() => props.openBox(boxIndex, index)}
                              sx={style}> {gridItem !== '□' ? gridItem : ''} </Box>
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
