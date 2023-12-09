import BookItem from "../BookItem";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

describe("BookList", () => {
    let component: any;
    const book = {
        category: "test category",
        description: "test description",
        id: "3f798a60-9603-11ee-b9d1-0242ac120002",
        price: "$10.99",
        title: "test title",
        url: "https://image.jpg",
    };

    beforeEach(async () => {
        component = render(<BookItem book={book} />);
    });

    it("renders the BookList component correctly", () => {
        const { container } = component;

        expect(container).toBeInTheDocument();
        expect(screen.getByText(book.category)).toBeInTheDocument();
        expect(screen.getByText(book.title)).toBeInTheDocument();
        expect(screen.getByText(book.price)).toBeInTheDocument();
    });
    it("dispatches when the button is clicked", () => {
        const button = screen.getByRole("button");
        const expectedArg = {
            payload: "3f798a60-9603-11ee-b9d1-0242ac120002",
            type: "updateBooks/removeBook",
        };
        button.click();

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(expectedArg);
    });
});
