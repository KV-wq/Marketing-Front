"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const contactInfo = [
  { Icon: Mail, label: "Email", value: "info@crafina.io" },
  { Icon: Phone, label: "Phone", value: "+1 (212) 555-0184" },
  { Icon: MapPin, label: "Address", value: "375 Park Avenue, New York, NY 10152" },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Message sent! We'll be in touch within 24 hours.");
    reset();
  };

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="px-6 md:px-10 max-w-7xl mx-auto py-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[10px] tracking-widest uppercase text-black/30 mb-5">
              Get in Touch
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-light leading-tight mb-6">
              Let's Talk
            </h1>
            <p className="text-black/50 text-sm leading-relaxed mb-14 max-w-sm">
              Whether you're ready to start a project or just want to explore
              what's possible — we'd love to hear from you.
            </p>

            <div className="space-y-8">
              {contactInfo.map(({ Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <Icon size={16} strokeWidth={1} className="mt-0.5 shrink-0 text-black/40" />
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-black/30 mb-1">
                      {label}
                    </p>
                    <p className="text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { field: "firstName", label: "First Name", placeholder: "Jane" },
                  { field: "lastName", label: "Last Name", placeholder: "Smith" },
                ].map(({ field, label, placeholder }) => (
                  <div key={field}>
                    <label className="block text-xs text-black/50 mb-2 tracking-wide">
                      {label} *
                    </label>
                    <input
                      {...register(field, { required: true })}
                      placeholder={placeholder}
                      className="w-full border border-black/20 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                ))}
              </div>

              {[
                { field: "email", label: "Email", placeholder: "you@company.com", type: "email" },
                { field: "company", label: "Company", placeholder: "Acme Inc.", type: "text" },
              ].map(({ field, label, placeholder, type }) => (
                <div key={field}>
                  <label className="block text-xs text-black/50 mb-2 tracking-wide">
                    {label} *
                  </label>
                  <input
                    {...register(field, { required: field === "email" })}
                    type={type}
                    placeholder={placeholder}
                    className="w-full border border-black/20 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs text-black/50 mb-2 tracking-wide">
                  How can we help? *
                </label>
                <textarea
                  {...register("message", { required: true })}
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="w-full border border-black/20 px-4 py-3.5 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : null}
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
