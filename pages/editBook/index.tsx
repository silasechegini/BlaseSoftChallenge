import { useDispatch } from "react-redux";
import { bookActions } from "../../store/bookSlice";
import { useRouter } from "next/router";
import BookForm from "../../components/books/BookForm";

//type imports
import { BookData } from "@/types";

const EditBookPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const editBookHandler = (newBookData: BookData) => {
        dispatch(bookActions.modifyBook(newBookData));
        router.back();
    };
    return <BookForm onAddBook={editBookHandler} buttonText='Edit Book' />;
};

export default EditBookPage;
