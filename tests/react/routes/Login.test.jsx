import { describe, it, expect } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routesConfig from "../../../src/routes.jsx";
import { RouterProvider, createMemoryRouter } from "react-router";
import { server } from "../../mocks/server.js";
import { handlersAlternative } from "../../mocks/handlers.js";

describe("The route ", () => {
    it("should be rendered with a form and a navigation bar", async () => {
        const initialEntry = "/login";
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });
        await waitFor(() => {
            const form = screen.getByRole("form");
            const navbar = screen.getByRole("navigation");
            expect(form).toBeInTheDocument();
            expect(navbar).toBeInTheDocument();
        });
    });

    it("should redirect to the homepage when the user logs in correctly", async () => {
        const loginRoute = "/login";
        const finalRoute = "/";
        const user = userEvent.setup();
        const router = createMemoryRouter(routesConfig, { initialEntries: [loginRoute] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });
        await waitFor(async () => {
            const userInput = screen.getByRole("textbox");
            const passwordInput = screen.getByLabelText("password");
            await user.type(userInput, "user");
            await user.type(passwordInput, "password");
        });
        const button = screen.getByRole("button");
        await user.click(button);
        expect(router.state.location.pathname).toBe(finalRoute);
    });

    it("should not redirect when the user logs in incorrectly", async () => {
        // Override the default handler for this test
        server.use(handlersAlternative.loginPost401);
        const loginRoute = "/login";
        const user = userEvent.setup();
        const router = createMemoryRouter(routesConfig, { initialEntries: [loginRoute] });

        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            const userInput = screen.getByRole("textbox");
            const passwordInput = screen.getByLabelText("password");
            await user.type(userInput, "user");
            await user.type(passwordInput, "password");
        });
        const button = screen.getByRole("button");
        await user.click(button);
        expect(router.state.location.pathname).toBe(loginRoute);
    });
});
