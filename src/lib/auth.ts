import { createNeonAuth } from "@neon/auth/next/server";
const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

// Vercel may build a project before its Neon Auth variables are configured.
// Keep public pages buildable; auth endpoints stay unavailable until configured.
export const auth = baseUrl && cookieSecret && cookieSecret.length >= 32
  ? createNeonAuth({ baseUrl, cookies: { secret: cookieSecret } })
  : null;
