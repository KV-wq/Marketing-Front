"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, Lock } from "lucide-react";
import adminAuthService from "@/lib/api/services/adminAuthService";
import useAdminStore from "@/lib/store/adminStore";

export default function AdminLoginPage() {
  const router = useRouter();
  const { setAuthenticated } = useAdminStore();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ login, password }) => {
    setLoading(true);
    try {
      await adminAuthService.login(login, password);
      setAuthenticated(true);
      router.push("/admin/orders");
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="flex items-center gap-3 mb-10">
          <Lock size={16} strokeWidth={1} className="text-white/40" />
          <span className="font-display text-xl tracking-[0.3em] uppercase text-white">
            FORMA Admin
          </span>
        </div>

        <h1 className="font-display text-4xl font-light text-white mb-8">
          Sign In
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-widests uppercase text-white/30 mb-2">
              Login
            </label>
            <input
              {...register("login", { required: true })}
              className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-widests uppercase text-white/30 mb-2">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="w-full bg-white/5 border border-white/10 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 text-xs tracking-widests uppercase hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-3 mt-2"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
