import { Provider, useSelector, useDispatch } from "react-redux";
import { bookActions } from "../bookSlice";
import { uiActions } from "../uiSlice";
import store from "../../store";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import bookCatalogue from "../books.json";

const newBook = {
    title: "The gossip girls",
    url: "https://newimage.jpg",
    price: "$34.99",
    category: "relax literature",
    description: "this is all about the gossip girls",
};

describe("bookSlice", () => {
    let Component: any;
    beforeEach(() => {
        Component = ({ TestComponent }: any) => {
            return (
                <Provider store={store}>
                    <TestComponent />
                </Provider>
            );
        };
    });

    it("should show default states ", () => {
        const TestComponent = () => {
            const state = useSelector((state: any) => state);

            expect(state.bookCatalogue.books).toStrictEqual(
                bookCatalogue.books,
            );
            expect(state.ui.notification).toStrictEqual({
                message: "",
                show: false,
                status: "",
                title: "",
            });
        };
        render(<Component TestComponent={TestComponent} />);
    });
    it("should show updated states for ui and books", () => {
        const TestComponent = () => {
            const dispatch = useDispatch();
            dispatch(
                uiActions.notification({
                    title: "test notification",
                    message: "test message",
                    show: true,
                }),
            );
            dispatch(
                bookActions.removeBook("574dd20a-939b-11ee-b9d1-0242ac120002"),
            );

            const state = useSelector((state: any) => state);
            expect(state.ui.notification).toStrictEqual({
                message: "test message",
                show: true,
                status: "",
                title: "test notification",
            });
            const expectedBooks = bookCatalogue.books.filter(
                (book) => book.id !== "574dd20a-939b-11ee-b9d1-0242ac120002",
            );
            expect(state.bookCatalogue.books).toStrictEqual(expectedBooks);
        };
        render(<Component TestComponent={TestComponent} />);
    });
    it("should show updated state for books ", () => {
        const TestComponent = () => {
            const dispatch = useDispatch();
            dispatch(bookActions.addBook(newBook));

            const { books } = useSelector((state: any) => state.bookCatalogue);

            expect(books.length).toBe(7);
        };
        render(<Component TestComponent={TestComponent} />);
    });
});
