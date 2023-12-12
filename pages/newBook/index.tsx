import { useState, Fragment, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { bookActions } from "../../store/bookSlice";
import { uiActions } from "../../store/uiSlice";
import BookForm from "../../components/books/BookForm";
import PopupTemplate from "../../components/PopupTemplate/PopupTemplate";
import NOTIFICATIONS from "../../local.json";
import { BookData } from "@/types";

const NewBookPage = (): ReactElement => {
    const [bookData, setBookData] = useState<BookData>();
    const dispatch = useDispatch();
    const router = useRouter();
    const { defaultNotification, addNotification } = NOTIFICATIONS;

    const addBookHandler = (newBookData: BookData) => {
        setBookData(newBookData);
        dispatch(
            uiActions.notification({
                ...addNotification,
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
        dispatch(bookActions.addBook(bookData));
        resetNotification();
        router.back();
    };
    const rejectHandler = () => {
        resetNotification();
    };
    return (
        <Fragment>
            <PopupTemplate onAffirm={affirmHandler} onReject={rejectHandler} />
            <BookForm onAddBook={addBookHandler} buttonText='Add Book' />
        </Fragment>
    );
};

export default NewBookPage;
