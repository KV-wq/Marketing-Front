"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { services, categories } from "@/lib/data/services";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };

export default function ServicesPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <>
      <Header />

      <main className="pt-32 pb-28 px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-[10px] tracking-widest uppercase text-black/30 mb-4">
              Our Services
            </p>
            <h1 className="font-display text-6xl md:text-7xl font-light leading-tight">
              What We Offer
            </h1>
            <p className="text-black/50 mt-5 max-w-lg text-sm leading-relaxed">
              16 specialist services across digital marketing, brand building,
              content creation, and analytics. Select any service to learn more
              and add it to your project.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 text-xs tracking-widest uppercase border transition-colors ${
                  active === cat
                    ? "bg-black text-white border-black"
                    : "border-black/20 text-black/50 hover:border-black hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <motion.div
            key={active}
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-black/10"
          >
            {filtered.map((service) => {
              const Icon = LucideIcons[service.icon] || LucideIcons.Star;
              return (
                <motion.div key={service.id} variants={fadeUp}>
                  <Link
                    href={`/service/${service.id}`}
                    className="group bg-white p-8 flex flex-col gap-5 h-full min-h-[220px] hover:bg-[#0a0a0a] transition-colors duration-300"
                  >
                    <Icon
                      size={26}
                      strokeWidth={1}
                      className="text-black/30 group-hover:text-white/40 transition-colors"
                    />
                    <div className="flex-1">
                      <h2 className="font-medium text-sm tracking-wide group-hover:text-white transition-colors">
                        {service.name}
                      </h2>
                      <p className="text-xs text-black/40 mt-1.5 leading-relaxed group-hover:text-white/40 transition-colors">
                        {service.tagline}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-black/25 group-hover:text-white/25 transition-colors">
                        €{service.pricePerHour}/hr
                      </span>
                      <ArrowRight
                        size={13}
                        className="text-black/20 group-hover:text-white/40 group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
