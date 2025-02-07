import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NavigationBar from "../../../src/components/NavigationBar.jsx";
import { MemoryRouter } from "react-router-dom";
import { elementsNavBar } from "../../../config/config.js";
import { getHrefsInfo } from "../../../src/utils/utils.js";

function createNavigationBar(isLogged = false, username) {
    return <NavigationBar isLogged={isLogged} username={username} />;
}

describe("The component ", () => {
    it("should have a navigation bar", () => {
        render(<MemoryRouter initialEntries={["/"]}>{createNavigationBar()}</MemoryRouter>);
        const nav = screen.getByRole("navigation");
        expect(nav).toBeInTheDocument();
    });

    it("should show the username when the the user is logged in", () => {
        const username = "randomUsername";
        render(
            <MemoryRouter initialEntries={["/"]}>
                {createNavigationBar(true, username)}
            </MemoryRouter>,
        );
        const divUsername = screen.getByText(username);
        expect(divUsername).toBeInTheDocument();
    });

    it("should NOT show the username when the the user is NOT logged in", () => {
        const username = "randomUsername";
        render(
            <MemoryRouter initialEntries={["/"]}>
                {createNavigationBar(false, username)}
            </MemoryRouter>,
        );
        const divUsername = screen.queryByText(username);
        expect(divUsername).not.toBeInTheDocument();
    });

    it("should show the corresponding options when the user is signed in", () => {
        const username = "randomUsername";
        const isLogged = true;
        const entries = getHrefsInfo(elementsNavBar, isLogged);
        render(
            <MemoryRouter initialEntries={["/"]}>
                {createNavigationBar(isLogged, username)}
            </MemoryRouter>,
        );
        entries.forEach((entry) => {
            const div = screen.getByText(entry[0]);
            expect(div).toBeInTheDocument();
        });
    });

    it("should show the corresponding options when the user is NOT signed in", () => {
        const isLogged = false;
        const entries = getHrefsInfo(elementsNavBar, isLogged);
        render(<MemoryRouter initialEntries={["/"]}>{createNavigationBar(isLogged)}</MemoryRouter>);
        entries.forEach((entry) => {
            const div = screen.getByText(entry[0]);
            expect(div).toBeInTheDocument();
        });
    });

    it("should have a svg", () => {
        render(<MemoryRouter initialEntries={["/"]}>{createNavigationBar()}</MemoryRouter>);
        const img = screen.getByRole("img");
        expect(img.src.includes(".svg")).toBeTruthy();
    });

    it("should have the svg inside a href element", () => {
        render(<MemoryRouter initialEntries={["/"]}>{createNavigationBar()}</MemoryRouter>);
        const img = screen.getByRole("img");
        const allHrefs = screen.getAllByRole("link");
        expect(allHrefs[0].children[0]).toBe(img);
    });
});
