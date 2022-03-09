import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface GameState {
  grid: string[],
  level: number,
  shouldStart: boolean,
}

const initialState = {
  grid: [],
  level: 1,
  shouldStart: false,
} as GameState

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGrid: (state, action: PayloadAction<string[]>) => {
      state.grid = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setStart: (state, action: PayloadAction<boolean>) => {
      state.shouldStart = action.payload;
    },

    createConnection: () => {},
    initGame: () => {},
    startGame: () => {},
  },
})

export const {setGrid, setLevel, setStart, createConnection,initGame, startGame} = gameSlice.actions
export default gameSlice.reducer