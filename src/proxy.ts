import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = auth?.middleware({ loginUrl: "/auth/sign-in", publicRoutes: ["/"] });

export default function proxy(request: NextRequest) {
  return authMiddleware ? authMiddleware(request) : NextResponse.next();
}
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico|favicon.svg).*)"]};
