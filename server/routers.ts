import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const bookingRequestSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(7).max(40),
  date: z.string().trim().min(1).max(32),
  service: z.enum(["Driveway", "Trash bins", "Both", "Other"]),
  estimate: z.string().trim().min(1).max(80),
  drivewayArea: z.number().int().min(600).max(3000).optional(),
  binCount: z.number().int().min(1).max(12).optional(),
  otherDetails: z.string().trim().max(2000).optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  booking: router({
    submit: publicProcedure.input(bookingRequestSchema).mutation(async ({ input }) => {
      if (input.service === "Other" && !input.otherDetails) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Please describe the requested service." });
      }

      const content = [
        "A new Surface Craft booking request was submitted.",
        "",
        `Customer: ${input.name}`,
        `Email: ${input.email}`,
        `Phone: ${input.phone}`,
        `Preferred date: ${input.date}`,
        `Service: ${input.service}`,
        `Estimate: ${input.estimate}`,
        input.drivewayArea ? `Approximate driveway size: ${input.drivewayArea.toLocaleString()} sq ft` : "",
        input.binCount ? `Number of trash bins: ${input.binCount}` : "",
        input.otherDetails ? `Additional details: ${input.otherDetails}` : "",
      ].filter(Boolean).join("\n");

      if (!ENV.googleAppsScriptUrl) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Booking delivery is not configured." });
      }

      let response: Response;
      try {
        response = await fetch(ENV.googleAppsScriptUrl, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...input, content }),
        });
      } catch {
        throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "We could not deliver the request. Please try again." });
      }

      if (!response.ok) {
        throw new TRPCError({ code: "SERVICE_UNAVAILABLE", message: "We could not deliver the request. Please try again." });
      }

      return { success: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
