import BookList from "../BookList";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import bookCatalogue from "./testUtils/books.json";
import { useSelector } from "react-redux";

const { books } = bookCatalogue;
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
    useSelector: jest.fn(() => books),
    useDispatch: () => mockDispatch,
}));

describe("BookList", () => {
    let component: any;

    beforeEach(() => {
        const RenderComponent = () => {
            const books = useSelector((state: any) => state);

            return <BookList books={books} />;
        };
        component = render(<RenderComponent />);
    });

    it("should render the BookList component correctly", () => {
        const { container } = component;
        expect(container).toBeInTheDocument();
        expect(screen.getByText("Great reads these days"));
        expect(screen.getByText("The Road to React"));
        expect(screen.getByText("The Art Of Saying NO"));
        expect(screen.getByText("The Magic of Thinking Big"));
        expect(screen.getByText("Gifted Hands: The Ben Carson Story"));
        expect(screen.getByText("Battlefield of the Mind"));
    });
    it("should delete single books", async () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(books.length);
        await fireEvent.click(buttons[0]);
        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith({
            payload: "574dd20a-939b-11ee-b9d1-0242ac120002",
            type: "updateBooks/removeBook",
        });

        await fireEvent.click(buttons[3]);
        expect(mockDispatch).toHaveBeenCalledWith({
            payload: "574dd8ea-939b-11ee-b9d1-0242ac120002",
            type: "updateBooks/removeBook",
        });
    });
});
