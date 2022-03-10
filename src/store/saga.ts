import {call, put, takeLatest, take, apply, fork} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga';

import GameConnection from "../common/gameConnection";

import {
  createConnection,
  initGame,
  startGame,
  setGrid,
  setGameOver,
  setStart,
  setLoading,
  setLevelBeforeGameOver
} from '../game/gameReducers';
import {PayloadAction} from "@reduxjs/toolkit";


function* getGrid(socket: any) {
  yield apply(socket, socket.send, ['map']);
}


function* sendStartGame(action: PayloadAction<string>) {
  yield apply(GameConnection.socket, GameConnection.socket.send, [action.payload]);
  yield apply(GameConnection.socket, GameConnection.socket.send, ['map']);
}


function* startSocketConnection(socket: (WebSocket)): any {

  return eventChannel(emitter => {

    const handleMessage = (event: { data: string; }) => {
      emitter(event.data);
    };

    socket.addEventListener('message', handleMessage)

    return () => {
      socket.removeEventListener('message', handleMessage);
    }
  })

}


function* initializeGame(): any {

  const socket: WebSocket = GameConnection.createConnection();
  const socketChannel = yield call(startSocketConnection, socket);

  try {
    while (true) {
      const data = yield take(socketChannel);
      if (data.indexOf('*') >= 0) {
        const grid = convertDataToGrid(data);
        yield put(setGrid(grid));

        yield put(setLevelBeforeGameOver(0));
        yield put(setLoading(false));
        yield put(setStart(false));
        yield put(setGameOver(true));

      } else if (data.indexOf('map') >= 0) {
        const grid = convertDataToGrid(data);
        yield put(setGrid(grid));
        yield put(setLoading(false));
      } else if (data.indexOf('open') >= 0) {
        yield fork(getGrid, socket);
      }
    }
  } catch (e) {
    console.log(e);
  }


}


const convertDataToGrid = (data: string): string[] => {
  let grid: string[] = data.split('map:\n');
  grid = grid[1].split('\n');
  grid.splice(grid.length - 1, 1);
  return grid;
}

function* watcherSaga() {
  yield takeLatest(createConnection.type, GameConnection.createConnection);
  yield takeLatest(initGame.type, initializeGame);
  yield takeLatest(startGame.type, sendStartGame);
}


export default watcherSaga;
