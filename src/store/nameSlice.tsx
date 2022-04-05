import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState: string = "stranger"

export const nameSlice = createSlice({
    name: 'name',
    initialState,
    reducers: {
        setName: (state, {payload}) => (payload)
    }
})
export const {setName} = nameSlice.actions
export const selectedName = ({name}: RootState): string => name
export default nameSlice.reducer;