import React from 'react';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store/store";
import {setLevel} from "./gameReducers";


const GameLevelSelector = () => {

  const state = useSelector((store: RootState) => store.game);
  const dispatch = useDispatch();

  return (
    <FormControl sx={{minWidth: 120, m: 3}}>
      <InputLabel id="level-select-label">Level</InputLabel>
      <Select
        labelId="level-select-label"
        id="level-select"
        value={state.level}
        label="Age"
        onChange={(e) => dispatch(setLevel(Number(e.target.value)))}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
  );
}

export default GameLevelSelector;
