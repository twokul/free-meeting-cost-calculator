import { oauth2Client, SCOPES } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  return NextResponse.redirect(url);
}
