import React, {useEffect} from 'react';
import {Container} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'

import GameConnection from "./common/gameConnection";
import {createConnection, startGame, initGame, setGameOver} from './game/gameReducers'
import {RootState} from './store/store'

import GameGrid from "./game/GameGrid";
import GameStartScreen from "./game/GameStartScreen";
import isConnectionReady from "./common/isConnectionReady";


const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((store: RootState) => store.game);
  const {grid, level, shouldStart} = state;


  useEffect(() => {
    dispatch(createConnection());
  }, [])

  useEffect(() => {
    if (!isConnectionReady() || level === 0 || !shouldStart) return;

    dispatch(initGame());
    dispatch(startGame(`new ${level}`));
    dispatch(setGameOver(false));
  }, [level, shouldStart])

  const openBox = (x: number, y: number): void => {
    if (!isConnectionReady() || !state.grid.length || state.grid[y][x] !== '□') return;
    const socket = GameConnection.createConnection();
    socket.send(`open ${x} ${y}`);
  }

  return (
    <Container maxWidth={false}>
      {
        grid.length > 0 ?
          <GameGrid openBox={openBox}/> :
          <GameStartScreen/>
      }
    </Container>
  );
}

export default App;
