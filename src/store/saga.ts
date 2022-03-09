import {call, put, takeLatest, take, apply, fork} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga';

import GameConnection from "../common/gameConnection";

import {createConnection, initGame, startGame, setGrid} from '../game/gameReducers'
import {PayloadAction} from "@reduxjs/toolkit";


function* getGrid(socket: any) {
  yield apply(socket, socket.send, ['map']);
}

function* sendStartGame(action: PayloadAction<string>) {
  yield apply(GameConnection.socket, GameConnection.socket.send, [action.payload]);
  yield apply(GameConnection.socket, GameConnection.socket.send, ['map']);
}


// eslint-disable-next-line require-yield
function* startSocketConnection(socket: (WebSocket)): any {

  // @ts-ignore
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
      const data = yield take(socketChannel)
      if (data.indexOf('map') >= 0) {
        let grid: string[] = data.split('map:\n');
        grid = grid[1].split('\n');
        grid.splice(grid.length - 1, 1); //
        yield put(setGrid(grid));
      } else if (data.indexOf('open') >= 0) {
        yield fork(getGrid, socket);
      }

    }
  } catch (e) {
    console.log(e);
  }


}


function* watcherSaga() {
  yield takeLatest(createConnection.type, GameConnection.createConnection);
  yield takeLatest(initGame.type, initializeGame);
  yield takeLatest(startGame.type, sendStartGame);
}


export default watcherSaga;
