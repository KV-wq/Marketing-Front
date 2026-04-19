"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { Suspense } from "react";

function Content() {
  const params = useSearchParams();
  const email = params.get("email") || "your inbox";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 border border-black/10 flex items-center justify-center mx-auto mb-8">
          <Mail size={28} strokeWidth={1} className="text-black/40" />
        </div>

        <Link
          href="/"
          className="font-display text-2xl font-light tracking-[0.3em] uppercase block mb-10 text-black/50"
        >
          CRafina
        </Link>

        <h1 className="font-display text-4xl font-light mb-4">
          Check Your Email
        </h1>
        <p className="text-black/50 text-sm leading-relaxed mb-8">
          We've sent a verification link to{" "}
          <strong className="text-black">{email}</strong>. Click the link in the
          email to activate your account.
        </p>

        <div className="bg-black/4 border border-black/8 p-5 text-center mb-10">
          <p className="text-xs text-black/50 leading-relaxed">
            Didn't receive it? Check your spam folder. If the email still
            doesn't arrive within a few minutes, try registering again.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-flex items-center gap-3 text-xs tracking-widests uppercase border-b border-black pb-1 hover:opacity-60 transition-opacity"
        >
          Already verified? Sign in <ArrowRight size={12} />
        </Link>
      </motion.div>
    </div>
  );
}

export default function EmailVerificationPage() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
