import { describe, it, expect } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routesConfig from "../../../src/routes.jsx";
import { RouterProvider, createMemoryRouter } from "react-router";
import { server } from "../../mocks/server.js";
import { http, HttpResponse } from "msw";

describe("The route ", () => {
    it("should redirect to /", async () => {
        // Override the default handler so we are logged in
        server.use(
            http.get("http://localhost:5000/login", () =>
                HttpResponse.json({ username: "someuser", data: "some data" }),
            ),
        );

        const user = userEvent.setup();
        const initialEntry = "/";
        const logoutRoute = "/logout";
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            const hrefLogout = screen.getByText(/logout/i);
            await user.click(hrefLogout);
        });
        expect(router.state.location.pathname).toBe(logoutRoute);
    });
});
