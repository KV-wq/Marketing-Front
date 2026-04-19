"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, Eye, EyeOff } from "lucide-react";
import useUserStore from "@/lib/store/userStore";
import userAuthService from "@/lib/api/services/userAuthService";
import { getPostAuthRedirect, clearPostAuthRedirect } from "@/lib/utils/postAuthRedirect";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async ({ login, password }) => {
    setLoading(true);
    try {
      const data = await userAuthService.login(login, password);
      setUser(data.user);
      toast.success("Welcome back!");
      const redirect = getPostAuthRedirect("/account");
      clearPostAuthRedirect();
      router.push(redirect);
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.errors?.[0]?.msg ||
        "Invalid credentials";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a0a] flex-col justify-between p-16">
        <Link href="/" className="font-display text-3xl font-light tracking-[0.3em] uppercase text-white">
          CRafina
        </Link>
        <div>
          <p className="font-display text-5xl font-light text-white leading-tight mb-6">
            Welcome
            <br />
            Back
          </p>
          <p className="text-white/30 text-sm leading-relaxed max-w-xs">
            Sign in to manage your projects, track orders, and access your
            marketing dashboard.
          </p>
        </div>
        <p className="text-white/15 text-xs tracking-widest">
          The Art of Marketing
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link href="/" className="lg:hidden block font-display text-2xl tracking-[0.3em] uppercase mb-10">
            CRafina
          </Link>

          <h1 className="font-display text-4xl font-light mb-2">Sign In</h1>
          <p className="text-sm text-black/40 mb-10">
            Don't have an account?{" "}
            <Link href="/register" className="text-black underline underline-offset-4 hover:opacity-60">
              Create one
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-xs text-black/50 mb-2 tracking-wide">
                Email or Username
              </label>
              <input
                {...register("login", { required: "This field is required" })}
                placeholder="you@example.com"
                className="w-full border border-black/20 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
              />
              {errors.login && (
                <p className="text-xs text-red-500 mt-1">{errors.login.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-black/50 mb-2 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", { required: "Password is required" })}
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full border border-black/20 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-black transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 mt-2"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : null}
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
