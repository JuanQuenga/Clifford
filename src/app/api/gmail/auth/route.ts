import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { google } from "googleapis";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

if (!clientId || !clientSecret) {
  throw new Error("Missing Google OAuth credentials");
}

if (!appUrl) {
  throw new Error("Missing NEXT_PUBLIC_APP_URL");
}

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  `${appUrl}/api/gmail/callback`,
);

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/gmail.readonly"],
    prompt: "consent",
    state: userId,
  });

  return NextResponse.json({ url: authUrl });
}
