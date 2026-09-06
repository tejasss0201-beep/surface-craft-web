import { describe, expect, it } from "vitest";

const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;

describe("newest Google Apps Script deployment", () => {
  it("matches the supplied exec URL and responds to a health check", async () => {
    expect(endpoint).toBe("https://script.google.com/macros/s/AKfycbxlru3JJ9nZylQ9-S5UqPzw8f_gCJefOVwHn5kkRTn5cK0VmmhnzMMJcZeYolpByuaH/exec");
    const response = await fetch(endpoint!, { method: "GET", redirect: "manual" });
    expect(response.status).toBeLessThan(500);
  }, 15_000);
});
