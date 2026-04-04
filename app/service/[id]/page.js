"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Check, ArrowLeft } from "lucide-react";
import * as LucideIcons from "lucide-react";
import toast from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getServiceById, services } from "@/lib/data/services";
import useCartStore from "@/lib/store/cartStore";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function ServicePage() {
  const { id } = useParams();
  const service = getServiceById(id);
  const { addItem } = useCartStore();
  const [hours, setHours] = useState(1);
  const [added, setAdded] = useState(false);

  if (!service) return notFound();

  const Icon = LucideIcons[service.icon] || LucideIcons.Star;
  const total = service.pricePerHour * hours;

  const related = services.filter(
    (s) => s.category === service.category && s.id !== service.id
  ).slice(0, 3);

  const handleAdd = () => {
    addItem(service, hours);
    setAdded(true);
    toast.success(`${service.name} added to cart`);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Top bar */}
        <div className="px-6 md:px-10 max-w-7xl mx-auto py-6 border-b border-black/10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors"
          >
            <ArrowLeft size={12} />
            All Services
          </Link>
        </div>

        <div className="px-6 md:px-10 max-w-7xl mx-auto py-16 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
              <Icon size={36} strokeWidth={1} className="text-black/30" />
              <span className="text-[10px] tracking-widest uppercase text-black/30">
                {service.category}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl font-light leading-tight mb-4"
            >
              {service.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-display text-xl font-light text-black/50 italic mb-8"
            >
              {service.tagline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-sm text-black/60 leading-relaxed max-w-2xl mb-14"
            >
              {service.description}
            </motion.p>

            <motion.div variants={fadeUp}>
              <p className="text-[10px] tracking-widest uppercase text-black/30 mb-6">
                What's Included
              </p>
              <ul className="space-y-4">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check size={14} className="mt-0.5 shrink-0 text-black/40" />
                    <span className="text-black/70">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Order Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:sticky lg:top-28 self-start border border-black/10 p-8"
          >
            <p className="text-[10px] tracking-widest uppercase text-black/30 mb-6">
              Add to Project
            </p>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-black/50">Rate</span>
                <span className="font-medium">€{service.pricePerHour}/hr</span>
              </div>
              <div className="border-t border-black/10 pt-4 mt-4">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-sm text-black/50">Hours</span>
                  <div className="flex items-center border border-black/20">
                    <button
                      onClick={() => setHours((h) => Math.max(1, h - 1))}
                      className="px-3 py-2 hover:bg-black/5 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-5 py-2 text-sm font-medium min-w-[50px] text-center">
                      {hours}
                    </span>
                    <button
                      onClick={() => setHours((h) => h + 1)}
                      className="px-3 py-2 hover:bg-black/5 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-widest uppercase text-black/30">
                    Total
                  </span>
                  <span className="font-display text-3xl font-light">
                    €{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-3 py-4 text-xs tracking-widest uppercase transition-all duration-300 ${
                added
                  ? "bg-black/80 text-white"
                  : "bg-black text-white hover:bg-black/80"
              }`}
            >
              {added ? (
                <>
                  <Check size={14} /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag size={14} /> Add to Cart
                </>
              )}
            </button>

            <p className="text-[10px] text-black/30 text-center mt-4 leading-relaxed">
              You won't be charged until checkout. Adjust hours anytime in your
              cart.
            </p>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-black/10 px-6 md:px-10 py-16 max-w-7xl mx-auto">
            <p className="text-[10px] tracking-widest uppercase text-black/30 mb-10">
              Related Services
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10">
              {related.map((rel) => {
                const RelIcon = LucideIcons[rel.icon] || LucideIcons.Star;
                return (
                  <Link
                    key={rel.id}
                    href={`/service/${rel.id}`}
                    className="group bg-white p-8 hover:bg-[#0a0a0a] transition-colors duration-300 block"
                  >
                    <RelIcon
                      size={22}
                      strokeWidth={1}
                      className="mb-4 text-black/30 group-hover:text-white/40 transition-colors"
                    />
                    <p className="font-medium text-sm group-hover:text-white transition-colors">
                      {rel.name}
                    </p>
                    <p className="text-xs text-black/40 mt-1 group-hover:text-white/40 transition-colors">
                      €{rel.pricePerHour}/hr
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
