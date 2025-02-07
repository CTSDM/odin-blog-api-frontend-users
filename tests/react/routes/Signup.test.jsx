import { describe, it, expect } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routesConfig from "../../../src/routes.jsx";
import { RouterProvider, createMemoryRouter } from "react-router";
import { user as userCredentials } from "../../validEntries.js";
import { server } from "../../mocks/server.js";
import { handlersAlternative } from "../../mocks/handlers.js";

describe("The route ", () => {
    it("should be rendered with a form and a navigation bar", async () => {
        const initialEntry = "/signup";
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

    it("should redirect to the login page when the user signs up in correctly", async () => {
        const signUpRoute = "/signup";
        const finalRoute = "/login";
        const user = userEvent.setup();
        const router = createMemoryRouter(routesConfig, { initialEntries: [signUpRoute] });

        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            const userInput = screen.getByRole("textbox");
            const passwordInput = screen.getByLabelText("password");
            const rePasswordInput = screen.getByLabelText("rePassword");
            await user.type(userInput, userCredentials.username);
            await user.type(passwordInput, userCredentials.password);
            await user.type(rePasswordInput, userCredentials.password);
        });

        const button = screen.getByRole("button");
        await user.click(button);
        expect(router.state.location.pathname).toBe(finalRoute);
    });

    it("should not redirect to the login page when the user signs up in incorrectly", async () => {
        server.use(handlersAlternative.signUpPost400);
        const signUpRoute = "/signup";
        const user = userEvent.setup();
        const router = createMemoryRouter(routesConfig, { initialEntries: [signUpRoute] });

        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            const userInput = screen.getByRole("textbox");
            const passwordInput = screen.getByLabelText("password");
            const rePasswordInput = screen.getByLabelText("rePassword");
            await user.type(userInput, userCredentials.username);
            await user.type(passwordInput, userCredentials.password);
            await user.type(rePasswordInput, userCredentials.password);
        });

        const button = screen.getByRole("button");
        await user.click(button);
        expect(router.state.location.pathname).toBe(signUpRoute);
    });

    it("should show some instructional messages about the username and password requirements", async () => {
        const signUpRoute = "/signup";
        const router = createMemoryRouter(routesConfig, { initialEntries: [signUpRoute] });

        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            const divUsername = screen.getByText(/the username must/i);
            const divPassword = screen.getByText(/the password must/i);
            expect(divUsername).toBeInTheDocument();
            expect(divPassword).toBeInTheDocument();
        });
    });
});
