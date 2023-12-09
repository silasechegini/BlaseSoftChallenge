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
    let component: any;

    const mockAffirm = jest.fn(() => mockDispatch());
    const mockReject = jest.fn();

    const defaultProps = {
        onAffirm: mockAffirm,
        onReject: mockReject,
    };

    beforeEach(() => {
        component = render(<PopupTemplate {...defaultProps} />);
    });

    it("should render the component correctly", () => {
        const { container } = component;

        expect(container).toBeInTheDocument();
        expect(screen.getByText("Test title")).toBeInTheDocument();
        expect(screen.getByText("test message")).toBeInTheDocument();
        expect(screen.getByText("Test title")).toBeInTheDocument();
    });
    it("should execute clicks on both buttons", () => {
        const buttons = screen.getAllByRole("button");
        expect(buttons.length).toBe(2);

        const [affirm, reject] = buttons;

        affirm.click();
        expect(mockAffirm).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledTimes(1);

        reject.click();
        expect(mockReject).toHaveBeenCalledTimes(1);
    });
});
