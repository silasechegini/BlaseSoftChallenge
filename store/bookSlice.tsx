import { createSlice } from "@reduxjs/toolkit";
import bookCatalogue from "./books.json";
import { BookData } from "@/types";
const { v4: generateId } = require("uuid");

type BookState = { books: BookData[] };
const initialState = { ...bookCatalogue };

const updateBooks = createSlice({
    name: "updateItem",
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
            const { id, title, url, price, description, category } =
                action.payload;
            const book = state.books.filter((item) => item.id === id);
            console.log(`book to upsert: ${JSON.stringify(book)}`);
            book[0].category = category;
            book[0].description = description;
            book[0].id = id;
            book[0].price = price;
            book[0].url = url;
            book[0].title = title;
        },
    },
});

const bookReducer = updateBooks.reducer;
export const bookActions = updateBooks.actions;
export default bookReducer;
