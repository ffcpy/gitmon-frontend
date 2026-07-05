"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveToken } from "@/lib/auth";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      saveToken(token);
      router.replace("/me?new=1");
    } else {
      router.replace("/");
    }
  }, [searchParams, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-grid">
      <p className="font-terminal text-lg text-amber-200 animate-pulse tracking-wide">
        Entrando no GitMon...
      </p>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense>
      <CallbackHandler />
    </Suspense>
  );
}