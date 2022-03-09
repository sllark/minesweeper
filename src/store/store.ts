import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'


import GameReducers from "../game/gameReducers";
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware()


const store = configureStore({
  reducer: {
    game: GameReducers
  },
  middleware:(getDefaultMiddleware => ([...getDefaultMiddleware({ thunk: false }), sagaMiddleware]))
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export default store;