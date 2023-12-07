import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { bookActions } from "../../store/bookSlice";
import BookForm from "../../components/books/BookForm";
import { BookData } from "@/types";

const NewBookPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const addBookHandler = (newBookData: BookData) => {
        dispatch(bookActions.addBook(newBookData));
        router.back();
    };
    return <BookForm onAddBook={addBookHandler} buttonText='Add Book' />;
};

export default NewBookPage;
