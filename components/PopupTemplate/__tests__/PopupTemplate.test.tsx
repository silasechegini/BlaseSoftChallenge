import PopupTemplate from "../PopupTemplate";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const mockDispatch = jest.fn();
const mockNotification = {
    notification: {
        title: "Test title",
        show: true,
        message: "test message",
    },
};
jest.mock("react-redux", () => ({
    useSelector: jest.fn(() => mockNotification),
}));

describe("Popuptemplate", () => {
    const mockAffirm = jest.fn(() => mockDispatch());
    const mockReject = jest.fn();

    const defaultProps = {
        onAffirm: mockAffirm,
        onReject: mockReject,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the component correctly", () => {
        const { container } = render(<PopupTemplate {...defaultProps} />);

        expect(container).toBeInTheDocument();
        expect(screen.getByText("Test title")).toBeInTheDocument();
        expect(screen.getByText("test message")).toBeInTheDocument();
        expect(screen.getByText("Test title")).toBeInTheDocument();
    });
    it("should execute clicks on both buttons", () => {
        render(<PopupTemplate {...defaultProps} />);
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(2);

        const [affirm, reject] = buttons;

        affirm.click();
        expect(mockAffirm).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledTimes(1);

        reject.click();
        expect(mockReject).toHaveBeenCalledTimes(1);
    });
    it("should have one button and execute click on it", () => {
        render(<PopupTemplate {...defaultProps} buttonText='OK' />);

        const button = screen.getAllByRole("button");
        expect(button.length).toBe(1);
        expect(screen.getByText("OK")).toBeInTheDocument();
        button[0].click();
        expect(mockAffirm).toHaveBeenCalledTimes(1);
    });
});
