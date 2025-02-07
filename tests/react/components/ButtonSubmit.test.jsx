import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ButtonSubmit from "../../../src/components/ButtonSubmit.jsx";

describe("The component ", () => {
    it("should be rendered", () => {
        render(<ButtonSubmit text={"something"} />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("should be rendered with a given text", () => {
        const text = "Random text";
        render(<ButtonSubmit text={text} />);
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent(text);
    });

    it("should be rendered with a fallback text if no text is given", () => {
        render(<ButtonSubmit />);
        const button = screen.getByRole("button");
        expect(button).toHaveTextContent("Submit");
    });
});
