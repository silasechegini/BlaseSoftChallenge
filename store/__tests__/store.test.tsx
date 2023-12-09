import { Provider, useSelector, useDispatch } from "react-redux";
import { bookActions } from "../bookSlice";
import { uiActions } from "../uiSlice";
import store from "..";
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

describe("store", () => {
    const Component = ({ TestComponent }: any) => {
        return (
            <Provider store={store}>
                <TestComponent />
            </Provider>
        );
    };

    it("should show default states ", () => {
        const TestComponent = () => {
            const { books } = useSelector((state: any) => state.bookCatalogue);
            const { notification } = useSelector((state: any) => state.ui);

            expect(books).toStrictEqual(bookCatalogue.books);
            expect(notification).toStrictEqual({
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

            const { notification } = useSelector((state: any) => state.ui);
            expect(notification).toStrictEqual({
                message: "test message",
                show: true,
                status: "",
                title: "test notification",
            });
            const expectedBooks = bookCatalogue.books.filter(
                (book) => book.id !== "574dd20a-939b-11ee-b9d1-0242ac120002",
            );
            const { books } = useSelector((state: any) => state.bookCatalogue);
            expect(books).toStrictEqual(expectedBooks);
        };
        render(<Component TestComponent={TestComponent} />);
    });
    it("should show updated state for books ", () => {
        const TestComponent = () => {
            const dispatch = useDispatch();
            dispatch(bookActions.addBook(newBook));

            const { books } = useSelector((state: any) => state.bookCatalogue);

            const foundBook = books.filter(
                (book: any) => book.title === newBook.title,
            );

            expect(foundBook.length).toEqual(1);
        };
        render(<Component TestComponent={TestComponent} />);
    });
    it("should show updated state for a book in books array", () => {
        const TestComponent = () => {
            const sampleBookData = {
                id: "574dd5f2-939b-11ee-b9d1-0242ac120002",
                title: "The Art Of Saying NO",
                url: "https://cdn.kobo.com/book-images/082c0db7-24d0-4ee8-903a-67b16b7a35f5/353/569/90/False/the-art-of-saying-no-1.jpg",
                price: "$7.99",
                category: "Self-help",
                description: "The art of saying no",
            };
            const modifiedBook = { ...sampleBookData, price: "$47.99" };
            const dispatch = useDispatch();
            dispatch(bookActions.modifyBook(modifiedBook));

            const { books } = useSelector((state: any) => state.bookCatalogue);

            const foundBook = books.filter(
                (book: any) => book.id === modifiedBook.id,
            );

            expect(foundBook.length).toEqual(1);
            expect(foundBook[0].price).toEqual(modifiedBook.price);
        };
        render(<Component TestComponent={TestComponent} />);
    });
});
