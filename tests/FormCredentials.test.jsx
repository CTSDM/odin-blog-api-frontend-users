import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormCredentials from "../src/components/FormCredentials";
import routes from "../src/routes.jsx";
import { env } from "../config/config.js";
import { RouterProvider, MemoryRouter, createMemoryRouter } from "react-router";

describe("The component ", () => {
    it("should be rendered", () => {
        console.log(routes);
        const goodRoute = "/signup";
        const router = createMemoryRouter(routes, { initialEntries: [goodRoute] });
        render(<RouterProvider router={router} />);
        const form = screen.getByRole("form");
        expect(form).toBeInTheDocument();
    });
});
