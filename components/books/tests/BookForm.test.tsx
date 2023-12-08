import BookForm from "../BookForm";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("BookForm", () => {
    it("renders the BookForm app correctly", () => {
        const onAddBook = jest.fn();

        const { container } = render(
            <BookForm onAddBook={onAddBook} buttonText='test' />,
        );

        expect(container).toBeInTheDocument();
    });
});
