import { Fragment, ReactElement } from "react";
import BookList from "../../components/books/BookList";
import { useSelector } from "react-redux";
import { State } from "@/types";

const BooksPage = (): ReactElement => {
    const { books, isLoading } = useSelector(
        (state: State) => state.bookCatalogue,
    );

    return (
        <Fragment>{!isLoading ? <BookList books={books} /> : null}</Fragment>
    );
};

export default BooksPage;
