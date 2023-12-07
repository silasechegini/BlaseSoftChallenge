import { useState } from "react";
import { useDispatch } from "react-redux";
import { bookActions } from "../../store/bookSlice";
import { uiActions } from "../../store/uiSlice";
import { useRouter } from "next/router";
import BookForm from "../../components/books/BookForm";
import PopupTemplate from "../../components/PopupTemplate/PopupTemplate";

//type imports
import { BookData } from "@/types";

const EditBookPage = () => {
    const [bookData, setBookData] = useState<BookData>();
    const dispatch = useDispatch();
    const router = useRouter();
    const editBookHandler = (newBookData: BookData) => {
        setBookData(newBookData);
        dispatch(
            uiActions.notification({
                title: "Confirm Edit",
                message: "sure you want to edit this book information ?",
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
        dispatch(bookActions.modifyBook(bookData));
        resetNotification();
        router.back();
    };
    const rejectHandler = () => {
        resetNotification();
    };
    return (
        <>
            <PopupTemplate onAffirm={affirmHandler} onReject={rejectHandler} />
            <BookForm onAddBook={editBookHandler} buttonText='Edit Book' />
        </>
    );
};

export default EditBookPage;
