import { createSlice } from "@reduxjs/toolkit";
import type { UIState } from "@/types";

const initialState: UIState = {
    notification: { status: "", title: "", message: "", show: false },
};
const uiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        notification(state, action) {
            if (action.payload) {
                Object.assign(state.notification, action.payload);
            } else {
                state.notification = initialState.notification;
            }
        },
    },
});

const uiReducer = uiSlice.reducer;
export const uiActions = uiSlice.actions;
export default uiReducer;
