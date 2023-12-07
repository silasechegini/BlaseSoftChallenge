import BookList from "../../components/books/BookList";
import { useSelector } from "react-redux";
import { BookData } from "@/types";

type State = {
    bookCatalogue: {
        books: BookData[];
    };
};

const BooksPage = () => {
    const { books } = useSelector((state: State) => state.bookCatalogue);

    return <BookList books={books} />;
};

export default BooksPage;
