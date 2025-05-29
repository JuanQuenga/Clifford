import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ScanPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#8B0000] to-[#000000] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Connect Your Email</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Email Connection Card */}
          <div className="rounded-xl bg-white/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Connect Email</h2>
            <p className="mb-6 text-gray-300">
              Connect your email account to start scanning for bills and BNPL
              orders.
            </p>
            <button className="rounded-lg bg-red-600 px-6 py-3 font-medium hover:bg-red-700">
              Connect Gmail
            </button>
          </div>

          {/* Scan Status Card */}
          <div className="rounded-xl bg-white/10 p-6">
            <h2 className="mb-4 text-2xl font-semibold">Scan Status</h2>
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-gray-300">Last Scan</span>
                <span className="text-gray-400">Never</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-gray-300">Connected Accounts</span>
                <span className="text-gray-400">0</span>
              </div>
            </div>
            <button
              className="w-full rounded-lg bg-white/10 px-6 py-3 font-medium hover:bg-white/20"
              disabled
            >
              Start New Scan
            </button>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="mt-12 rounded-xl bg-white/10 p-6">
          <h2 className="mb-4 text-2xl font-semibold">How It Works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white/5 p-4">
              <div className="mb-2 text-xl font-semibold text-red-400">
                1. Connect
              </div>
              <p className="text-gray-300">
                Connect your email account securely using OAuth2 authentication.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="mb-2 text-xl font-semibold text-red-400">
                2. Scan
              </div>
              <p className="text-gray-300">
                We'll scan your emails for bills and BNPL orders automatically.
              </p>
            </div>
            <div className="rounded-lg bg-white/5 p-4">
              <div className="mb-2 text-xl font-semibold text-red-400">
                3. Monitor
              </div>
              <p className="text-gray-300">
                Track your bills and payments in one place with real-time
                updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
