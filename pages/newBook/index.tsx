import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { bookActions } from "../../store/bookSlice";
import { uiActions } from "../../store/uiSlice";
import BookForm from "../../components/books/BookForm";
import PopupTemplate from "../../components/PopupTemplate/PopupTemplate";
import { BookData } from "@/types";

const NewBookPage = () => {
    const [bookData, setBookData] = useState<BookData>();
    const dispatch = useDispatch();
    const router = useRouter();

    const addBookHandler = (newBookData: BookData) => {
        setBookData(newBookData);
        dispatch(
            uiActions.notification({
                title: "Confirm Add Book",
                message: "sure you want to add this book ?",
                show: true,
            }),
        );
    };
    const resetNotification = () => {
        dispatch(
            uiActions.notification({
                title: "",
                message: "",
                show: false,
            }),
        );
    };
    const affirmHandler = () => {
        dispatch(bookActions.addBook(bookData));
        resetNotification();
        router.back();
    };
    const rejectHandler = () => {
        resetNotification();
    };
    return (
        <>
            <PopupTemplate onAffirm={affirmHandler} onReject={rejectHandler} />
            <BookForm onAddBook={addBookHandler} buttonText='Add Book' />
        </>
    );
};

export default NewBookPage;
