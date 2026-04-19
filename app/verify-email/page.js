"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Suspense } from "react";
import userAuthService from "@/lib/api/services/userAuthService";
import useUserStore from "@/lib/store/userStore";
import { getPostAuthRedirect, clearPostAuthRedirect } from "@/lib/utils/postAuthRedirect";

function Content() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const { setUser } = useUserStore();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [successRedirect, setSuccessRedirect] = useState("/account");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    userAuthService
      .verifyEmail(token)
      .then((data) => {
        if (data.user) setUser(data.user);
        const redirect = getPostAuthRedirect("/account");
        clearPostAuthRedirect();
        setSuccessRedirect(redirect);
        setStatus("success");
        setTimeout(() => router.push(redirect), 3000);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(
          err?.error || err?.message || "Verification failed or link expired."
        );
      });
  }, [token, setUser, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <Link href="/" className="font-display text-2xl font-light tracking-[0.3em] uppercase block mb-12 text-black/50">
          CRafina
        </Link>

        {status === "loading" && (
          <>
            <Loader2 size={36} className="mx-auto animate-spin text-black/30 mb-6" />
            <p className="font-display text-3xl font-light mb-3">Verifying…</p>
            <p className="text-sm text-black/40">
              Please wait while we confirm your email.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 size={36} strokeWidth={1} className="mx-auto text-black mb-6" />
            <p className="font-display text-3xl font-light mb-3">Email Confirmed</p>
            <p className="text-sm text-black/50 mb-8">
              Your account is now active. Redirecting you{successRedirect === "/checkout" ? " to checkout" : " to your account"}…
            </p>
            <Link
              href={successRedirect}
              className="bg-black text-white px-10 py-3.5 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors"
            >
              {successRedirect === "/checkout" ? "Continue to Checkout" : "Go to Account"}
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle size={36} strokeWidth={1} className="mx-auto text-black/30 mb-6" />
            <p className="font-display text-3xl font-light mb-3">Verification Failed</p>
            <p className="text-sm text-black/50 mb-8">{message}</p>
            <Link
              href="/register"
              className="bg-black text-white px-10 py-3.5 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors"
            >
              Try Again
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
