import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface GameState {
  grid: string[],
  level: number,
  shouldStart: boolean,
  gameOver: boolean,
  isLoading: boolean,
  levelBeforeGameOver: number,
}

const initialState: GameState = {
  grid: [],
  level: 1,
  shouldStart: false,
  gameOver: false,
  isLoading: false,
  levelBeforeGameOver: 1,
}

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
    setGameOver: (state, action: PayloadAction<boolean>) => {
      state.gameOver = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLevelBeforeGameOver: (state, action: PayloadAction<number>) => {
      state.levelBeforeGameOver = state.level;
    },
    createConnection: () => {
    },
    initGame: () => {
    },
    startGame: (state, action) => {},
  },
})

export const {
  setGrid,
  setLevel,
  setStart,
  createConnection,
  initGame,
  startGame,
  setGameOver,
  setLoading,
  setLevelBeforeGameOver
} = gameSlice.actions
export default gameSlice.reducer