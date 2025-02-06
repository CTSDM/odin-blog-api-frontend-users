/* eslint react/prop-types: 0 */
import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputComp from "../src/components/InputComp";

const defaultParameters = {
    type: "text",
    name: "name",
    placeholder: "placeholder",
    minLength: 4,
    maxLength: 10,
};

function InputCompDefault({
    type = defaultParameters.text,
    name = defaultParameters.name,
    placeholder = defaultParameters.placeholder,
    minLength = defaultParameters.minLength,
    maxLength = defaultParameters.maxLength,
    handleOnChange = () => {},
} = {}) {
    return (
        <InputComp
            type={type}
            name={name}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            handleOnChange={handleOnChange}
        />
    );
}

describe("The component ", () => {
    it("should be rendered", () => {
        render(InputCompDefault());
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toBeInTheDocument();
    });

    it("should be rendered with a text type", () => {
        const type = "text";
        render(InputCompDefault({ type }));
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveAttribute("type", "text");
    });

    it("should be rendered with a textarea type", () => {
        const type = "textarea";
        render(InputCompDefault({ type }));
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveAttribute("type", "textarea");
    });

    it("should be rendered with a password type", () => {
        const type = "password";
        const name = "password";
        render(InputCompDefault({ type, name }));
        const inputElement = screen.getByLabelText(name);
        expect(inputElement).toHaveAttribute("type", "password");
    });

    it("should be rendered with a label with a given placeholder", () => {
        const placeholderForLabel = "placeholderforLabel";
        render(InputCompDefault({ placeholder: placeholderForLabel }));
        const inputElement = screen.getByLabelText(placeholderForLabel);
        expect(inputElement).toBeInTheDocument();
    });

    it("should call the handleOnChange function when the user types on the input", async () => {
        const handleOnChange = vi.fn();
        const user = userEvent.setup();
        render(InputCompDefault({ handleOnChange }));
        const inputElement = screen.getByRole("textbox");
        inputElement.focus();
        await user.keyboard("test");
        expect(handleOnChange).toHaveBeenCalled();
    });

    it("should NOT call the handleOnChange function when the user does NOT type on the input", async () => {
        const handleOnChange = vi.fn();
        render(InputCompDefault({ handleOnChange }));
        expect(handleOnChange).not.toHaveBeenCalled();
    });

    it(`should call the handleOnChange function N times when the user types N characters but less than ${defaultParameters.maxLength} characters`, async () => {
        const handleOnChange = vi.fn();
        const testWord = "test";
        expect(testWord.length < defaultParameters.maxLength).toBeTruthy();
        const user = userEvent.setup();
        render(InputCompDefault({ handleOnChange }));
        const inputElement = screen.getByRole("textbox");
        await user.type(inputElement, testWord);
        expect(handleOnChange).toHaveBeenCalledTimes(testWord.length);
    });

    it(`should call the handleOnChange function ${defaultParameters.maxLength} when the user types more than ${defaultParameters.maxLength} characters`, async () => {
        const handleOnChange = vi.fn();
        const testWord = "s".repeat(defaultParameters.maxLength + 10);
        const user = userEvent.setup();
        render(InputCompDefault({ handleOnChange }));
        const inputElement = screen.getByRole("textbox");
        await user.type(inputElement, testWord);
        expect(handleOnChange).toHaveBeenCalledTimes(defaultParameters.maxLength);
    });
});
