import React, {useEffect} from 'react';
import {Container} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'

import GameConnection from "./common/gameConnection";
import {createConnection, startGame, initGame} from './game/gameReducers'
import {RootState} from './store/store'

import GameGrid from "./game/GameGrid";
import GameStartScreen from "./game/GameStartScreen";


const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((store: RootState) => store.game);
  const {grid, level, shouldStart} = state;


  useEffect(()=>{
    dispatch(createConnection());
  },[])

  useEffect(() => {
    if (!GameConnection.socket || level === 0 || !shouldStart) return;

    dispatch(initGame());
    // @ts-ignore
    dispatch(startGame(`new ${level}`));


  }, [level, shouldStart])

  const openBox = (x: number, y: number): void => {
    const socket = GameConnection.createConnection();
    if (!socket) return;
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
