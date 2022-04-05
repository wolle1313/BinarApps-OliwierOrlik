import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { gameInfoApi } from "../placeholders";
import { gameInfoData } from "../types";
import { RootState } from "./store";
const initialState: gameInfoData = {
    gameInfo: [],
    status: 'loading',
    currentNumber: -1
};

export const fetchGameInfo = createAsyncThunk(
    'gameInfo/fetchGameInfo',
    () => gameInfoApi
)


const gameInfoSlice = createSlice({
    name: 'gameInfo',
    initialState,
    reducers: {
        changeNumber: (state) => {
           let randomNumber = 0
            do {
                randomNumber = Math.floor(Math.random() * state.gameInfo.length)
            }
            while(randomNumber === state.currentNumber)
            return({
                ...state,
                currentNumber: randomNumber
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGameInfo.fulfilled, (state, {payload}) => ({
            ...state,
            gameInfo: payload,
            currentNumber: Math.floor(Math.random() * payload.length),
            status: "success"
        }))
        builder.addCase(fetchGameInfo.pending, (state) => ({
            ...state,
            status: "loading"
        }))
        builder.addCase(fetchGameInfo.rejected, (state) => ({
            ...state,
            status: 'failed',
        }))
    }
})
export const {changeNumber} = gameInfoSlice.actions;
export const selectedGameInfo = ({gameInfo}: RootState): gameInfoData => gameInfo
export default gameInfoSlice.reducer;