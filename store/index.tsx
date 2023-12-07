import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
    reducer: { ui: uiReducer, bookCatalogue: bookReducer },
});

export default store;
