import BookItem from "./BookItem";
import classes from "./BookList.module.css";

// type imports
import type { BookData } from "../../types";

type Props = {
    books: BookData[];
};

function BooksList({ books }: Props): React.ReactElement {
    const renderHeading =
        books.length > 0 ? (
            <h1>Great reads these days</h1>
        ) : (
            <h1>There are no books here</h1>
        );
    return (
        <div className={classes.books}>
            {renderHeading}
            <ul className={classes.list}>
                {books.map((book) => (
                    <BookItem key={book.id} book={book} />
                ))}
            </ul>
        </div>
    );
}

export default BooksList;
