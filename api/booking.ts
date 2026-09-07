import { z } from "zod";

export const bookingRequestSchema = z.object({
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

type Request = {
  method?: string;
  body?: unknown;
};

type Response = {
  status: (code: number) => Response;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
};

function respondError(res: Response, status: number, message: string) {
  res.status(status).json({ success: false, error: message });
}

export default async function handler(req: Request, res: Response) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    respondError(res, 405, "Method not allowed.");
    return;
  }

  const parsed = bookingRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    respondError(res, 400, "Please complete the required booking details.");
    return;
  }

  const input = parsed.data;
  if (input.service === "Other" && !input.otherDetails) {
    respondError(res, 400, "Please describe the requested service.");
    return;
  }

  const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!endpoint) {
    respondError(res, 500, "Booking delivery is not configured.");
    return;
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

  try {
    const delivery = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...input, content }),
    });

    if (!delivery.ok) {
      respondError(res, 502, "We could not deliver the request. Please try again.");
      return;
    }
  } catch {
    respondError(res, 502, "We could not deliver the request. Please try again.");
    return;
  }

  res.status(200).json({ success: true });
}
