"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { services } from "@/lib/data/services";

const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "We immerse ourselves in your business, market, and competitive landscape to uncover the opportunities others miss.",
  },
  {
    step: "02",
    title: "Strategy",
    desc: "A bespoke growth roadmap built around your specific objectives, audience, and resources.",
  },
  {
    step: "03",
    title: "Execution",
    desc: "Flawless delivery by specialist teams working in focused sprints with full transparency.",
  },
  {
    step: "04",
    title: "Scale",
    desc: "We optimise relentlessly, doubling down on what works and eliminating what doesn't.",
  },
];

const testimonials = [
  {
    quote:
      "FORMA transformed our digital presence entirely. Within six months our organic traffic tripled and lead quality improved dramatically. Genuinely one of the best decisions we've made.",
    author: "Alexandra Chen",
    role: "CMO, Meridian Capital",
  },
  {
    quote:
      "The brand strategy work was exceptional. They understood our positioning challenges instantly and delivered a framework that our team actually uses every day.",
    author: "James Whitfield",
    role: "Founder, Arborist Co.",
  },
  {
    quote:
      "Our performance marketing ROAS went from 1.8x to 6.4x in four months. The rigor and transparency of their process is unlike any agency we've worked with.",
    author: "Sofia Ramirez",
    role: "VP Growth, Luma Health",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const featuredServices = services.slice(0, 6);

export default function Home() {
  const scrollDown = () => {
    const el = document.getElementById("services-preview");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const [stripActive, setStripActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStripActive((v) => (v + 1) % 4), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <Header />

      <main>
        <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
          <div className="hero-media" aria-hidden>
            <video autoPlay muted loop playsInline preload="auto">
              <source src="/back.webm" type="video/webm" />
            </video>
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <p className="text-white/50 text-[10px] tracking-[0.5em] uppercase mb-8">
              The Art of Marketing
            </p>

            <h1 className="font-display text-5xl md:text-8xl font-light text-white leading-[1.05] tracking-wide mb-8">
              Marketing That
              <br />
              <em className="not-italic">Moves Markets</em>
            </h1>

            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12">
              We craft data-driven marketing strategies for ambitious brands.
              From SEO to brand identity — we engineer your growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services"
                className="sm:w-48 text-center bg-white text-black px-10 py-4 text-xs tracking-widest uppercase hover:bg-white/90 transition-colors"
              >
                Explore Services
              </Link>
              <Link
                href="/register"
                className="sm:w-48 text-center border border-white text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-white/10 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollDown}
            className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors animate-bounce"
          >
            <ChevronDown size={24} strokeWidth={1} />
          </button>
        </section>

        {/* Services Preview */}
        <section
          id="services-preview"
          className="py-28 px-6 md:px-10 max-w-7xl mx-auto"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-[10px] tracking-widest uppercase text-black/30 mb-4">
                What We Do
              </p>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight max-w-lg">
                Our Expertise
              </h2>
              <p className="text-black/50 mt-4 max-w-md text-sm leading-relaxed">
                16 specialist services. One strategic vision.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10"
            >
              {featuredServices.map((service) => {
                const Icon = LucideIcons[service.icon] || LucideIcons.Star;
                return (
                  <motion.div key={service.id} variants={fadeUp}>
                    <Link
                      href={`/service/${service.id}`}
                      className="group bg-white p-10 flex flex-col gap-6 h-full hover:bg-[#0a0a0a] transition-colors duration-300"
                    >
                      <Icon
                        size={28}
                        strokeWidth={1}
                        className="text-black/40 group-hover:text-white/50 transition-colors"
                      />
                      <div>
                        <h3 className="font-medium text-base tracking-wide group-hover:text-white transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-xs text-black/40 mt-1 group-hover:text-white/40 transition-colors">
                          {service.tagline}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-black/30 group-hover:text-white/30 transition-colors mt-auto">
                        <span>€{service.pricePerHour}/hr</span>
                        <ArrowRight
                          size={12}
                          className="ml-auto group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-12 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 text-xs tracking-widest uppercase border-b border-black pb-1 hover:opacity-60 transition-opacity"
              >
                View All 16 Services <ArrowRight size={12} />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Strip */}
        <section className="relative z-10 bg-[#0a0a0a] border-t border-white/8">
          <div className="max-w-7xl mx-auto md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/8">
              {[
                { num: "01", title: "Data-First", sub: "Every decision backed by real numbers" },
                { num: "02", title: "Full-Service", sub: "From strategy to flawless execution" },
                { num: "03", title: "Always-On", sub: "Continuous optimisation, zero downtime" },
                { num: "04", title: "Results-Obsessed", sub: "We measure what actually matters" },
              ].map((item, i) => {
                const isActive = stripActive === i;
                const isMobileRight = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className={`relative py-7 px-5 overflow-hidden border-r border-white/8 last:border-r-0 ${i === 1 ? "md:border-r border-r-0 border-b md:border-b-0" : ""} ${i === 0 ? "border-b md:border-b-0" : ""}`}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 h-[1.5px] bg-white/50"
                      animate={{ width: isActive ? "100%" : "0%" }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    />
                    <motion.p
                      className="text-[9px] tracking-[0.3em] uppercase mb-3"
                      animate={{ color: isActive ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.12)" }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.num}
                    </motion.p>
                    <motion.p
                      className="text-sm font-medium mb-1.5"
                      animate={{ color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.45)" }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.title}
                    </motion.p>
                    <motion.p
                      className="text-[11px] leading-relaxed"
                      animate={{ color: isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)" }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.sub}
                    </motion.p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-28 px-6 md:px-10 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <p className="text-[10px] tracking-widest uppercase text-black/30 mb-4">
                Our Process
              </p>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight">
                How We Work
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {process.map((item) => (
                <motion.div key={item.step} variants={fadeUp}>
                  <p className="font-display text-6xl font-light text-black/10 mb-4 leading-none">
                    {item.step}
                  </p>
                  <h3 className="font-medium text-base tracking-wide mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black/50 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#f8f8f8] py-28 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-16">
                <p className="text-[10px] tracking-widest uppercase text-black/30 mb-4">
                  Client Results
                </p>
                <h2 className="font-display text-5xl md:text-6xl font-light leading-tight">
                  What They Say
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="bg-white p-10 border border-black/5"
                  >
                    <p className="font-display text-4xl text-black/10 leading-none mb-6">
                      "
                    </p>
                    <p className="text-sm text-black/70 leading-relaxed mb-8">
                      {t.quote}
                    </p>
                    <div>
                      <p className="text-sm font-medium">{t.author}</p>
                      <p className="text-xs text-black/40 mt-1">{t.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 bg-[#0a0a0a] overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute left-0 bottom-0 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-0 left-1/4 h-full w-px bg-linear-to-b from-transparent via-white/5 to-transparent" />
            <div className="absolute top-0 right-1/4 h-full w-px bg-linear-to-b from-transparent via-white/5 to-transparent" />
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/2.5 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/2 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-36">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div>
                <motion.p
                  variants={fadeUp}
                  className="text-[10px] tracking-[0.4em] uppercase text-white/25 mb-6"
                >
                  Ready to Grow?
                </motion.p>
                <motion.h2
                  variants={fadeUp}
                  className="font-display text-6xl md:text-[96px] font-light text-white leading-none"
                >
                  Start Your
                  <br />
                  <em className="not-italic opacity-40">Project</em>
                </motion.h2>
              </div>

              <motion.div variants={fadeUp} className="flex flex-col gap-8">
                <p className="text-white/35 text-base leading-relaxed max-w-sm">
                  Browse our 16 specialist services, build your order, and let
                  us engineer your next stage of growth.
                </p>

                <div className="grid grid-cols-2 gap-px bg-white/8">
                  {[
                    { label: "500+", sub: "Clients Worldwide" },
                    { label: "98%", sub: "Retention Rate" },
                    { label: "12yr", sub: "Of Expertise" },
                    { label: "€2.4B", sub: "Revenue Generated" },
                  ].map((s) => (
                    <div key={s.label} className="bg-[#0a0a0a] p-6">
                      <p className="font-display text-3xl font-light text-white mb-1">
                        {s.label}
                      </p>
                      <p className="text-[10px] tracking-widest uppercase text-white/25">
                        {s.sub}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/services"
                    className="flex-1 bg-white text-black text-center py-4 text-xs tracking-widest uppercase hover:bg-white/90 transition-colors"
                  >
                    Browse Services
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 border border-white/20 text-white/60 text-center py-4 text-xs tracking-widest uppercase hover:border-white hover:text-white transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
