import { describe, expect, it } from "vitest";

const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;

describe("new Google Apps Script deployment", () => {
  it("uses the newly supplied exec deployment and responds to a health check", async () => {
    expect(endpoint).toMatch(/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/);
    const response = await fetch(endpoint!, { method: "GET", redirect: "manual" });
    expect(response.status).toBeLessThan(500);
  }, 15_000);
});
