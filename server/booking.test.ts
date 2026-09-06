import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const caller = appRouter.createCaller({
  user: null,
  req: {} as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

describe("booking.submit", () => {
  it("rejects an Other request without additional details", async () => {
    await expect(caller.booking.submit({
      name: "Test Customer",
      email: "test@example.com",
      phone: "972-555-0100",
      date: "2026-09-15",
      service: "Other",
      estimate: "Custom quote",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
