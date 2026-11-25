import { auth } from "@/lib/auth";
const handlers = auth?.handler();
const unavailable = () => Response.json(
  { error: "Neon Auth is not configured. Set NEON_AUTH_BASE_URL and NEON_AUTH_COOKIE_SECRET." },
  { status: 503 },
);

export const GET = handlers?.GET ?? unavailable;
export const POST = handlers?.POST ?? unavailable;
export const PUT = handlers?.PUT ?? unavailable;
export const DELETE = handlers?.DELETE ?? unavailable;
export const PATCH = handlers?.PATCH ?? unavailable;
