import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  payload: {
    headers: Array<{
      name: string;
      value: string;
    }>;
  };
}

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Get access token from your database
  // You'll need to implement this part based on your database setup
  const accessToken = "YOUR_ACCESS_TOKEN";

  // Fetch recent emails
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=50",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const data = await response.json();
  const messages = data.messages || [];

  // Process each message
  const processedEmails = await Promise.all(
    messages.map(async (message: { id: string }) => {
      const emailResponse = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const emailData: GmailMessage = await emailResponse.json();

      // Extract relevant information
      const subject = emailData.payload.headers.find(
        (header) => header.name === "Subject",
      )?.value;
      const from = emailData.payload.headers.find(
        (header) => header.name === "From",
      )?.value;
      const date = emailData.payload.headers.find(
        (header) => header.name === "Date",
      )?.value;

      // Look for BNPL-related keywords
      const bnplKeywords = [
        "afterpay",
        "klarna",
        "affirm",
        "zip",
        "splitit",
        "sezzle",
        "quadpay",
        "laybuy",
      ];

      const isBNPL = bnplKeywords.some((keyword) =>
        (subject?.toLowerCase() + emailData.snippet.toLowerCase()).includes(
          keyword,
        ),
      );

      return {
        id: emailData.id,
        subject,
        from,
        date,
        snippet: emailData.snippet,
        isBNPL,
      };
    }),
  );

  // Filter for BNPL-related emails
  const bnplEmails = processedEmails.filter((email) => email.isBNPL);

  return NextResponse.json({ emails: bnplEmails });
}
