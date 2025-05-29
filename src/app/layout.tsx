import "~/styles/globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clifford",
  description: "Clifford finds ands monitors BNPL orders.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const clerkAppearance = {
  elements: {
    formButtonPrimary: "bg-red-600 hover:bg-red-700 text-sm normal-case",
    card: "bg-black/90 border border-white/10",
    headerTitle: "text-white",
    headerSubtitle: "text-gray-300",
    socialButtonsBlockButton:
      "bg-white/10 hover:bg-white/20 text-white border-white/10",
    formFieldInput: "bg-white/10 border-white/10 text-white",
    formFieldLabel: "text-gray-300",
    footerActionLink: "text-red-400 hover:text-red-300",
    formFieldAction: "text-red-400 hover:text-red-300",
    identityPreviewEditButton: "text-red-400 hover:text-red-300",
    userButtonAvatarBox: "w-8 h-8",
    userButtonPopoverCard: "bg-black/90 border border-white/10",
    userButtonPopoverActionButton: "text-white hover:bg-white/10",
    userButtonPopoverFooter: "border-t border-white/10",
    userPreview: "text-white",
    userButtonPopoverActionButtonText: "text-white",
    userButtonPopoverActionButtonIcon: "text-white",
    userButtonPopoverActionButtonArrow: "text-white",
    userButtonPopoverActionButtonArrowBox: "text-white",
    userButtonPopoverActionButtonArrowBoxHover: "bg-white/10",
    userButtonPopoverActionButtonArrowBoxActive: "bg-white/20",
    userButtonPopoverActionButtonArrowBoxFocus: "bg-white/10",
    userButtonPopoverActionButtonArrowBoxDisabled: "opacity-50",
    userButtonPopoverActionButtonArrowBoxLoading: "opacity-50",
  },
  layout: {
    socialButtonsPlacement: "bottom" as const,
    socialButtonsVariant: "blockButton" as const,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider appearance={clerkAppearance}>
      <html lang="en" className={`${geist.variable}`}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Cookie&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="bg-gradient-to-b from-[#8B0000] to-[#000000] text-white">
          <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <nav className="flex items-center gap-6">
                <Link href="/" className="text-xl font-semibold text-white">
                  Clifford
                </Link>
                <SignedIn>
                  <Link
                    href="/scan"
                    className="text-gray-300 transition-colors hover:text-white"
                  >
                    Scan Emails
                  </Link>
                </SignedIn>
              </nav>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/20">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-700">
                      Sign Up
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
