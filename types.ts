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

export type UiState = {
    notification: {
        status: string;
        title: string;
        message: string;
    };
};

export type State = {
    bookCatalogue: BookState;
    ui: UiState;
};
