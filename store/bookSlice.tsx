import { createSlice } from "@reduxjs/toolkit";
import bookCatalogue from "./books.json";
import { BookState } from "@/types";
const { v4: generateId } = require("uuid");

const initialState: BookState = { ...bookCatalogue };

const updateBooks = createSlice({
    name: "updateBooks",
    initialState: initialState,
    reducers: {
        removeBook(state: BookState, action) {
            state.books = state.books.filter(
                (item) => item.id !== action.payload,
            );
        },
        addBook(state, action) {
            state.books.push({
                ...action.payload,
                id: generateId(),
            });
        },
        modifyBook(state, action) {
            const { id } = action.payload;
            const book = state.books.filter((item) => item.id === id);
            Object.assign(book[0], action.payload);
        },
    },
});

const bookReducer = updateBooks.reducer;
export const bookActions = updateBooks.actions;
export default bookReducer;
