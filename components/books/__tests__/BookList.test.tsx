import { ReactElement, ReactNode } from "react";
import {
    fireEvent,
    render,
    screen,
    waitFor,
    act,
} from "@testing-library/react";
import { useSelector, Provider } from "react-redux";
import "@testing-library/jest-dom";
import BookList from "../BookList";
import store from "../../../store";

const INITIAL_BUTTON_LENGTH: 5 = 5;

describe("BookList", () => {
    let component: any;
    type Props = {
        TestComponent: () => ReactElement;
    };

    beforeEach(() => {
        const Component = ({ TestComponent }: Props): ReactNode => {
            return (
                <Provider store={store}>
                    <TestComponent />
                </Provider>
            );
        };
        const RenderComponent = (): ReactElement => {
            const { books } = useSelector((state: any) => state.bookCatalogue);

            return <BookList books={books} />;
        };
        component = render(<Component TestComponent={RenderComponent} />);
    });

    it("should render the BookList component correctly", () => {
        const { container, getByText } = component;
        expect(container).toBeInTheDocument();
        expect(getByText("Great reads these days"));
        expect(getByText("The Road to React"));
        expect(getByText("The Art Of Saying NO"));
        expect(getByText("The Magic of Thinking Big"));
        expect(getByText("Gifted Hands: The Ben Carson Story"));
        expect(getByText("Battlefield of the Mind"));
    });
    it("should behave correctly when books are deleted", async () => {
        let buttons: HTMLElement[] | null = screen.getAllByRole("button");

        expect(buttons.length).toBe(INITIAL_BUTTON_LENGTH);

        await act(async () => {
            if (buttons !== null) {
                await fireEvent.click(buttons[0]);
            }
        });

        await waitFor(() => {
            buttons = screen.getAllByRole("button");
            expect(buttons.length).toBe(INITIAL_BUTTON_LENGTH - 1);
            expect(
                screen.queryByText("Great reads these days"),
            ).toBeInTheDocument();
            expect(
                screen.queryByText("There are no books here"),
            ).not.toBeInTheDocument();
        });

        for (let i = 0; i < buttons.length; i++) {
            await act(async () => {
                if (buttons !== null) {
                    await fireEvent.click(buttons[i]);
                }
            });
        }

        await waitFor(() => {
            buttons = screen.queryAllByRole("button");
            expect(buttons.length).toBe(0);
            expect(
                screen.queryByText("Great reads these days"),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByText("There are no books here"),
            ).toBeInTheDocument();
        });
    });
});
