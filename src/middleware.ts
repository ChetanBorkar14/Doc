import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // No authentication - allow all requests
  return NextResponse.next();
}

export const config = {
  matcher: []
};


