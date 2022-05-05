import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state = action;
        },
        removeAuth: (state) => {
            state = {};
        },
    },
});

export const { setAuth, removeAuth } = authSlice.actions;

export default authSlice.reducer;
