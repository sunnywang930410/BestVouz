import { createSlice } from "@reduxjs/toolkit";


const lightMode = true;

const initialState = { lightMode };

const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        setColorMode: (state, action) => {
            state.lightMode = action.payload;
        },
    },
});

export const selectLightMode = (state) => state.color.lightMode;

export const { setColorMode } = colorSlice.actions;

export default colorSlice.reducer;