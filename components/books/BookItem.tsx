import Link from "next/link";
import Image from "next/image";
import Card from "../ui/Card";
import { useDispatch } from "react-redux";
import { bookActions } from "../../store/bookSlice";
import classes from "./BookItem.module.css";

//type imports
import { BookData } from "../../types";

type Props = {
    book: BookData;
};

function EventItem({ book }: Props) {
    const dispatch = useDispatch();
    const deleteHandler = (event: any) => {
        event.preventDefault();
        dispatch(bookActions.removeBook(book.id));
    };

    return (
        <div className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <Link href={{ pathname: "/editBook", query: { ...book } }}>
                        <img src={book.url} alt={book.title} />
                    </Link>
                </div>
                <div className={classes.content}>
                    <h3>{book.title}</h3>
                    <p>
                        <i>category: </i>
                        <b>{book.category}</b>
                    </p>
                    <i>{book.price}</i>
                </div>
                <div className={classes.actions}>
                    <button onClick={deleteHandler}>Delete</button>
                </div>
            </Card>
        </div>
    );
}

export default EventItem;
