"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, Eye, EyeOff } from "lucide-react";
import userAuthService from "@/lib/api/services/userAuthService";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = async ({
    username,
    email,
    password,
    firstName,
    lastName,
  }) => {
    setLoading(true);
    try {
      await userAuthService.register({
        username,
        email,
        password,
        firstName,
        lastName,
      });
      router.push(`/email-verification?email=${encodeURIComponent(email)}`);
    } catch (err) {
      const msg =
        err?.error ||
        err?.errors?.[0]?.msg ||
        err?.message ||
        "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a0a] flex-col justify-between p-16">
        <Link
          href="/"
          className="font-display text-3xl font-light tracking-[0.3em] uppercase text-white"
        >
          FORMA
        </Link>
        <div>
          <p className="font-display text-5xl font-light text-white leading-tight mb-6">
            Start Your
            <br />
            Growth Story
          </p>
          <p className="text-white/30 text-sm leading-relaxed max-w-xs">
            Join hundreds of ambitious brands that trust FORMA to engineer their
            marketing growth.
          </p>
        </div>
        <p className="text-white/15 text-xs tracking-widest">
          The Art of Marketing
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <Link
            href="/"
            className="lg:hidden block font-display text-2xl tracking-[0.3em] uppercase mb-10"
          >
            FORMA
          </Link>

          <h1 className="font-display text-4xl font-light mb-2">
            Create Account
          </h1>
          <p className="text-sm text-black/40 mb-10">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-black underline underline-offset-4 hover:opacity-60"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  field: "firstName",
                  label: "First Name",
                  placeholder: "John",
                },
                { field: "lastName", label: "Last Name", placeholder: "Doe" },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs text-black/50 mb-2 tracking-wide">
                    {label}
                  </label>
                  <input
                    {...register(field, { required: `${label} required` })}
                    placeholder={placeholder}
                    className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  {errors[field] && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors[field].message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {[
              {
                field: "username",
                label: "Username",
                placeholder: "username",
                type: "text",
              },
              {
                field: "email",
                label: "Email",
                placeholder: "you@example.com",
                type: "email",
              },
            ].map(({ field, label, placeholder, type }) => (
              <div key={field}>
                <label className="block text-xs text-black/50 mb-2 tracking-wide">
                  {label}
                </label>
                <input
                  {...register(field, { required: `${label} is required` })}
                  type={type}
                  placeholder={placeholder}
                  className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                />
                {errors[field] && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors[field].message}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-xs text-black/50 mb-2 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  })}
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors pr-12"
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
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs text-black/50 mb-2 tracking-wide">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  validate: (v) => v === password || "Passwords do not match",
                })}
                type="password"
                placeholder="••••••••"
                className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 mt-2"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : null}
              Create Account
            </button>
          </form>

          <p className="text-[10px] text-black/30 text-center mt-6 leading-relaxed">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}
