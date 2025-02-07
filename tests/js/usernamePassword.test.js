// This tests only checks that the username and password that are going to be used
// in all the other tests are valid with the specified constraints
import { checkPassword, checkUsername } from "../../src/utils/utils.js";
import { describe, it, expect } from "vitest";
import { user } from "../validEntries.js";

describe("The username ", () => {
    it("should be valid", () => {
        const arr = [];
        checkUsername(user.username, arr);
        expect(arr).toHaveLength(0);
    });

    it("should be invalid", () => {
        const arr = [];
        checkUsername("1", arr);
        expect(arr.length > 0).toBeTruthy();
    });
});

describe("The password ", () => {
    it("should be valid", () => {
        const arr = [];
        checkPassword(user.password, arr);
        expect(arr).toHaveLength(0);
    });

    it("should be invalid", () => {
        const arr = [];
        checkPassword("1", arr);
        expect(arr.length > 0).toBeTruthy();
    });
});
