import { describe, it, expect } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routesConfig from "../../../src/routes.jsx";
import { RouterProvider, createMemoryRouter } from "react-router";
import { username, password } from "../../validEntries.js";

describe("The component ", () => {
    it("should be rendered", async () => {
        const signUpRoute = "/signup";
        const router = createMemoryRouter(routesConfig, { initialEntries: [signUpRoute] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });
        await waitFor(() => {
            const form = screen.getByRole("form");
            expect(form).toBeInTheDocument();
        });
    });

    it("should do nothing when the form is sent empty", async () => {
        const signUpRoute = "/signup";
        const user = userEvent.setup();
        const router = createMemoryRouter(routesConfig, { initialEntries: [signUpRoute] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });
        await waitFor(async () => {
            const button = screen.getByRole("button");
            await user.click(button);
            expect(router.state.location.pathname).toBe(signUpRoute);
        });
    });

    it("should redirect to login when a valid username and password are used", async () => {
        const signUpRoute = "/signup";
        const loginRoute = "/login";
        const user = userEvent.setup();
        const router = createMemoryRouter(routesConfig, { initialEntries: [signUpRoute] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });
        await waitFor(async () => {
            const textInput = screen.getByRole("textbox");
            const passwordInput = screen.getByLabelText("password");
            const rePasswordInput = screen.getByLabelText("rePassword");
            await user.type(textInput, username);
            await user.type(passwordInput, password);
            await user.type(rePasswordInput, password);
        });

        const button = screen.getByRole("button");
        await user.click(button);
        expect(router.state.location.pathname).toBe(loginRoute);
    });

    it("should NOT redirect when a invalid username and password are used", async () => {
        const signUpRoute = "/signup";
        const user = userEvent.setup();
        const router = createMemoryRouter(routesConfig, { initialEntries: [signUpRoute] });

        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            const textInput = screen.getByRole("textbox");
            const passwordInput = screen.getByLabelText("password");
            const rePasswordInput = screen.getByLabelText("rePassword");
            await user.type(textInput, "a");
            await user.type(passwordInput, "a");
            await user.type(rePasswordInput, "b");
        });

        const button = screen.getByRole("button");
        await user.click(button);
        expect(router.state.location.pathname).toBe(signUpRoute);
    });
});
