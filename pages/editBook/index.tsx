import { useState } from "react";
import { useDispatch } from "react-redux";
import { bookActions } from "../../store/bookSlice";
import { uiActions } from "../../store/uiSlice";
import { useRouter } from "next/router";
import BookForm from "../../components/books/BookForm";
import PopupTemplate from "../../components/PopupTemplate/PopupTemplate";
import NOTIFICATIONS from "../../local.json";

//type imports
import { BookData } from "@/types";

const EditBookPage = () => {
    const [bookData, setBookData] = useState<BookData>();
    const dispatch = useDispatch();
    const router = useRouter();
    const { defaultNotification, editNotification } = NOTIFICATIONS;
    const editBookHandler = (newBookData: BookData) => {
        setBookData(newBookData);
        dispatch(
            uiActions.notification({
                ...editNotification,
                show: true,
            }),
        );
    };
    const resetNotification = () => {
        dispatch(
            uiActions.notification({
                ...defaultNotification,
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
