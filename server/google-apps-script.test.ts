import { describe, expect, it } from "vitest";

const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;

describe("Google Apps Script booking endpoint", () => {
  it("is configured as an HTTPS exec URL", () => {
    expect(endpoint).toMatch(/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/);
  });

  it("responds to a lightweight health check without submitting a booking", async () => {
    if (!endpoint) throw new Error("GOOGLE_APPS_SCRIPT_URL is not configured");
    const response = await fetch(endpoint, { method: "GET", redirect: "manual" });
    expect(response.status).toBeLessThan(500);
  }, 15_000);
});
