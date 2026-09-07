import { afterEach, describe, expect, it, vi } from "vitest";
import handler from "./booking";

type TestResponse = {
  statusCode?: number;
  body?: unknown;
  status: (code: number) => TestResponse;
  json: (body: unknown) => void;
  setHeader: () => void;
  end: () => void;
};

function createResponse(): TestResponse {
  const response = {
    statusCode: undefined,
    body: undefined,
    status(code: number) {
      response.statusCode = code;
      return response;
    },
    json(body: unknown) {
      response.body = body;
    },
    setHeader() {},
    end() {},
  };
  return response;
}

const validBooking = {
  name: "Test Customer",
  email: "test@example.com",
  phone: "972-880-9311",
  date: "2026-09-20",
  service: "Driveway" as const,
  estimate: "$100.00 estimated",
  drivewayArea: 600,
};

afterEach(() => {
  delete process.env.GOOGLE_APPS_SCRIPT_URL;
  vi.restoreAllMocks();
});

describe("Vercel booking endpoint", () => {
  it("rejects incomplete submissions before delivery", async () => {
    const response = createResponse();

    await handler({ method: "POST", body: { name: "", email: "not-an-email" } }, response);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      success: false,
      error: "Please complete the required booking details.",
    });
  });

  it("rejects non-POST requests", async () => {
    const response = createResponse();

    await handler({ method: "GET" }, response);

    expect(response.statusCode).toBe(405);
    expect(response.body).toEqual({ success: false, error: "Method not allowed." });
  });

  it("reports missing delivery configuration", async () => {
    const response = createResponse();

    await handler({ method: "POST", body: validBooking }, response);

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({ success: false, error: "Booking delivery is not configured." });
  });

  it("forwards a valid booking and reports success", async () => {
    process.env.GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/test/exec";
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const response = createResponse();

    await handler({ method: "POST", body: validBooking }, response);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://script.google.com/macros/s/test/exec",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("reports a failed Apps Script delivery", async () => {
    process.env.GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/test/exec";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("failed", { status: 500 })));
    const response = createResponse();

    await handler({ method: "POST", body: validBooking }, response);

    expect(response.statusCode).toBe(502);
    expect(response.body).toEqual({ success: false, error: "We could not deliver the request. Please try again." });
  });
});
