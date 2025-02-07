import { expect, beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./mocks/server.js";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Start the server before all test
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());

expect.extend(matchers);

afterAll(() => server.close());

afterEach(() => {
    cleanup();
});
