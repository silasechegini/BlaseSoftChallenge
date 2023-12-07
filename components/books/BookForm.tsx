import { useRef } from "react";
import { useRouter } from "next/router";

// type imports
import type { BookData } from "../../types";

import Card from "../ui/Card";
import classes from "./BookForm.module.css";

type PropType = {
    onAddBook: (data: BookData) => void;
    buttonText: string;
};

function BookForm({ onAddBook, buttonText }: PropType) {
    const titleInputRef = useRef<any>();
    const imageInputRef = useRef<any>();
    const priceInputRef = useRef<any>();
    const categoryInputRef = useRef<any>();
    const descriptionInputRef = useRef<any>();

    const { query } = useRouter();
    const id: string = typeof query.id === "string" ? query.id : "";

    function submitHandler(event: any) {
        event.preventDefault();

        const bookData: BookData = {
            id: id,
            title: titleInputRef.current.value,
            url: imageInputRef.current.value,
            price: priceInputRef.current.value,
            description: descriptionInputRef.current.value,
            category: categoryInputRef.current.value,
        };

        onAddBook(bookData);

        titleInputRef.current.value = "";
        imageInputRef.current.value = "";
        priceInputRef.current.value = "";
        categoryInputRef.current.value = "";
        descriptionInputRef.current.value = "";
    }

    return (
        <div className={classes.formContainer}>
            <Card>
                <form className={classes.form} onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor='title'>Title</label>
                        <input
                            type='text'
                            required
                            id='title'
                            defaultValue={query ? query.title : ""}
                            ref={titleInputRef}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='image'>Image Url</label>
                        <input
                            type='url'
                            required
                            id='image'
                            defaultValue={query ? query.url : ""}
                            ref={imageInputRef}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='price'>Price</label>
                        <input
                            type='text'
                            required
                            id='price'
                            defaultValue={query ? query.price : ""}
                            ref={priceInputRef}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='category'>Category</label>
                        <input
                            type='text'
                            required
                            id='category'
                            defaultValue={query ? query.category : ""}
                            ref={categoryInputRef}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='description'>Description</label>
                        <textarea
                            id='description'
                            required
                            rows={5}
                            defaultValue={query ? query.description : ""}
                            ref={descriptionInputRef}></textarea>
                    </div>
                    <div className={classes.actions}>
                        <button>{buttonText}</button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default BookForm;
