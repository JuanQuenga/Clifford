"use client";

import { useState } from "react";

interface AuthResponse {
  url: string;
}

export function ScanButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/gmail/auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = (await response.json()) as AuthResponse;

      if (!data.url) {
        throw new Error("Invalid response from server");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Failed to connect Gmail:", error);
      setError(
        error instanceof Error ? error.message : "Failed to connect Gmail",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="rounded-lg bg-red-600 px-6 py-3 font-medium hover:bg-red-700 disabled:opacity-50"
      >
        {isLoading ? "Connecting..." : "Connect Gmail"}
      </button>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
