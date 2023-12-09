import BookForm from "../BookForm";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("BookForm in default state", () => {
    let component: any;
    const onAddBook = jest.fn();
    beforeEach(async () => {
        useRouter.mockImplementation(() => ({
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null),
        }));

        component = render(
            <BookForm onAddBook={onAddBook} buttonText='test' />,
        );
    });

    it("renders the BookForm correctly", () => {
        const { container } = component;

        expect(container).toBeInTheDocument();
        expect(container.querySelector("form")).toBeInTheDocument();
        expect(container.getElementsByClassName("control").length).toBe(5);
    });
    it("adds text to the text fields", () => {
        const title = screen.getByTestId("title");
        const image = screen.getByTestId("image");
        const price = screen.getByTestId("price");
        const category = screen.getByTestId("category");
        const description = screen.getByTestId("description");
        const button = screen.getByRole("button");

        const expectedData = {
            category: "test category",
            description: "test description",
            id: "",
            price: "$10.99",
            title: "test title",
            url: "https://image.jpg",
        };

        fireEvent.change(title, { target: { value: "test title" } });
        fireEvent.change(image, { target: { value: "https://image.jpg" } });
        fireEvent.change(price, { target: { value: "$10.99" } });
        fireEvent.change(category, { target: { value: "test category" } });
        fireEvent.change(description, {
            target: { value: "test description" },
        });
        button.click();

        expect(onAddBook).toHaveBeenCalledTimes(1);
        expect(onAddBook).toHaveBeenCalledWith(expectedData);
    });
});
describe("BookForm with some default data", () => {
    let component: any;
    const onAddBook = jest.fn();
    beforeEach(async () => {
        useRouter.mockImplementation(() => ({
            route: "/",
            pathname: "",
            query: {
                id: "7003ae0c-95fb-11ee-b9d1-0242ac120002",
                category: "spiritual literature",
                description: "a path way to discovering yourself",
                price: "$15.99",
                title: "Self Discovery",
                url: "https://selfdiscovery.jpg",
            },
            asPath: "",
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null),
        }));

        component = render(
            <BookForm onAddBook={onAddBook} buttonText='test' />,
        );
    });
    it("renders the form with the default data", () => {
        const button = screen.getByRole("button");

        const expectedData = {
            category: "spiritual literature",
            description: "a path way to discovering yourself",
            id: "7003ae0c-95fb-11ee-b9d1-0242ac120002",
            price: "$15.99",
            title: "Self Discovery",
            url: "https://selfdiscovery.jpg",
        };
        button.click();

        expect(onAddBook).toHaveBeenCalledTimes(1);
        expect(onAddBook).toHaveBeenCalledWith(expectedData);
    });
    it("reflects edited form data", () => {
        const button = screen.getByRole("button");

        const price = screen.getByTestId("price");
        const description = screen.getByTestId("description");

        fireEvent.change(price, { target: { value: "$17.99" } });
        fireEvent.change(description, {
            target: { value: "How you can evolve in these times" },
        });
        button.click();

        expect(
            screen.getByText("a path way to discovering yourself"),
        ).toBeInTheDocument();
        expect(screen.getByDisplayValue("$17.99")).toBeInTheDocument();
    });
});
