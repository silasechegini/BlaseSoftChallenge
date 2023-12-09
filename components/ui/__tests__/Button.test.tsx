import Button from "../Button";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockOnClick = jest.fn();
describe("Button", () => {
    it("should render the button component", () => {
        render(<Button onClick={() => mockOnClick()} buttonText='test' />);

        const button = screen.getByRole("button");
        button.click();

        expect(screen.getByText("test")).toBeInTheDocument();
        expect(mockOnClick).toHaveBeenCalled();
    });
});
