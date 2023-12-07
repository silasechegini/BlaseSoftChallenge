import { createSlice } from "@reduxjs/toolkit";
type uiState = {
    notification: {
        status: string;
        title: string;
        message: string;
    };
};
const initialState: uiState = {
    notification: { status: "", title: "", message: "" },
};
const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        notification(state, action) {
            if (action.payload) {
                const { status, title, message } = action.payload;
                state.notification = { status, title, message };
            } else {
                state.notification = initialState.notification;
            }
        },
    },
});

const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
export default uiReducer;
