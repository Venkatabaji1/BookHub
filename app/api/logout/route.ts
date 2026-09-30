import { NextResponse } from "next/server";

export function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("bookhub_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}