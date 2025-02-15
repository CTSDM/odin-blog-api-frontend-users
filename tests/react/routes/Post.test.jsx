import { describe, it, expect } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routesConfig from "../../../src/routes.jsx";
import { RouterProvider, createMemoryRouter } from "react-router";
import { server } from "../../mocks/server.js";
import { handlersAlternative } from "../../mocks/handlers.js";
import { comment, post } from "../../validEntries.js";

describe("The route ", () => {
    it("should show a post information with comments", async () => {
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            expect(screen.getByText(post.title)).toBeInTheDocument();
            expect(screen.getByText(post.content)).toBeInTheDocument();
            expect(screen.getByText(post.username)).toBeInTheDocument();
            post.comments.forEach((comment) => {
                expect(screen.getByText(comment.content)).toBeInTheDocument();
                expect(screen.getByText(comment.username)).toBeInTheDocument();
            });
        });
    });

    it("should not show the option to write a new comment when the user is not logged in", async () => {
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            const button = screen.queryByRole("button");
            const inputText = screen.queryByRole("textbox");
            expect(button).not.toBeInTheDocument();
            expect(inputText).not.toBeInTheDocument();
        });
    });

    it("should show the option to write a new comment when the user is logged in", async () => {
        // Override the default handler so we are logged in
        server.use(handlersAlternative.loginGet);
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(() => {
            expect(screen.getByRole("button", { name: "Submit new comment" })).toBeInTheDocument();
            expect(screen.getByRole("textbox")).toBeInTheDocument();
        });
    });

    it("should post a new comment when the a logged in user comments", async () => {
        // Override the default handler so we are logged in
        server.use(handlersAlternative.loginGet);
        const user = userEvent.setup();
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        // Override the default get handler for a specific post id such that the new comment can be added
        server.use(handlersAlternative.postIdGet);

        await waitFor(async () => {
            const input = screen.getByRole("textbox");
            const button = screen.getByRole("button", { name: "Submit new comment" });
            await user.type(input, comment.content);
            await user.click(button);
        });

        expect(screen.getByText(comment.content)).toBeInTheDocument();
    });

    it("should show a informational message when a 404 status is received when getting the post information", async () => {
        // Override the default response to the post GET
        server.use(handlersAlternative.postIdGet400);
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            expect(screen.getByText(/the post could not be found/i)).toBeInTheDocument();
        });
    });

    it("should change the like icon when liking a post", async () => {
        // Override so we are logged in
        server.use(handlersAlternative.loginGet);
        const user = userEvent.setup();
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            let img = screen.getByAltText(/empty heart symbol/i);
            const button = img.parentNode;
            expect(img).toBeInTheDocument();
            await user.click(button);
            img = screen.getByAltText(/heart symbol with/i);
            expect(img).toBeInTheDocument();
        });
    });

    it("should change the like icon when unliking a post", async () => {
        // Override so we are logged in with an account that already liked the post
        server.use(handlersAlternative.loginGetLiked);
        const user = userEvent.setup();
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            let img = screen.getByAltText(/heart symbol with/i);
            const button = img.parentNode;
            expect(img).toBeInTheDocument();
            await user.click(button);
            img = screen.getByAltText(/empty heart symbol/i);
            expect(img).toBeInTheDocument();
        });
    });

    it("should change the like icon when unliking a post", async () => {
        // Override so we are logged in with an account that already liked the post
        server.use(handlersAlternative.loginGetLiked);
        const user = userEvent.setup();
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            let img = screen.getByAltText(/heart symbol with/i);
            const button = img.parentNode;
            expect(img).toBeInTheDocument();
            await user.click(button);
            img = screen.getByAltText(/empty heart symbol/i);
            expect(img).toBeInTheDocument();
        });
    });

    it("should change the like icon when liking a post", async () => {
        // Override so we are logged in
        server.use(handlersAlternative.loginGet);
        const user = userEvent.setup();
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            let img = screen.getByAltText(/empty heart symbol/i);
            const button = img.parentNode;
            expect(img).toBeInTheDocument();
            await user.click(button);
            img = screen.getByAltText(/heart symbol with/i);
            expect(img).toBeInTheDocument();
        });
    });

    it("should display a message when a 500 status is received when liking a post", async () => {
        // Override so we are logged in
        server.use(handlersAlternative.loginGet);
        // Override to get a 500 status when liking a post
        server.use(handlersAlternative.likePost500);
        const user = userEvent.setup();
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            const img = screen.getByAltText(/empty heart symbol/i);
            const button = img.parentNode;
            await user.click(button);
            expect(img).toBeInTheDocument();
            expect(screen.getByText(/something went wrong on the server/i)).toBeInTheDocument();
        });
    });

    it("should do nothing when a 404 status is received when unliking a post that is not liked", async () => {
        // Override so we are logged in
        server.use(handlersAlternative.loginGetLiked);
        // Override to get a 500 status when liking a post
        server.use(handlersAlternative.likeDelete404);
        const user = userEvent.setup();
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            let img = screen.getByAltText(/heart symbol with/i);
            expect(img).toBeInTheDocument();
            const button = img.parentNode;
            await user.click(button);
            img = screen.getByAltText(/empty heart symbol/i);
            expect(img).toBeInTheDocument();
        });
    });

    it("should display a message when a 500 status is received when unliking a post that is not liked", async () => {
        // Override so we are logged in
        server.use(handlersAlternative.loginGetLiked);
        // Override to get a 500 status when liking a post
        server.use(handlersAlternative.likeDelete500);
        const user = userEvent.setup();
        const initialEntry = `/posts/${post.id}`;
        const router = createMemoryRouter(routesConfig, { initialEntries: [initialEntry] });
        await act(async () => {
            render(<RouterProvider router={router} />);
        });

        await waitFor(async () => {
            let img = screen.getByAltText(/heart symbol with/i);
            expect(img).toBeInTheDocument();
            const button = img.parentNode;
            await user.click(button);
            expect(img).toBeInTheDocument();
        });
    });
});
