export type BookData = {
    id: string;
    title: string;
    url: string;
    price: string;
    description: string;
    category: string;
};

export type BookState = {
    books: BookData[];
};

export type UIState = {
    notification: {
        status: string;
        title: string;
        message: string;
        show?: boolean;
    };
};

export type State = {
    bookCatalogue: BookState;
    ui: UIState;
};
