import BookItem from "./BookItem";
import classes from "./BookList.module.css";
import local from "../../local.json";

// type imports
import type { BookData } from "../../types";

type Props = {
    books: BookData[];
};

function BooksList({ books }: Props): React.ReactElement {
    const { bookList } = local;
    const renderHeading =
        books.length > 0 ? (
            <h1>{bookList.titleWithBooks}</h1>
        ) : (
            <h1>{bookList.titleWithoutBooks}</h1>
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
