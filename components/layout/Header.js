"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import useCartStore from "@/lib/store/cartStore";
import useUserStore from "@/lib/store/userStore";
import CartSidebar from "./CartSidebar";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, openCart } = useCartStore();
  const { isAuthenticated } = useUserStore();

  const cartCount = items.reduce((s, i) => s + i.hours, 0);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const headerBg =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-white/95 backdrop-blur-sm border-b border-black/10";

  const textColor = isHome && !scrolled ? "text-white" : "text-[#0a0a0a]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${headerBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className={`font-display text-2xl font-light tracking-[0.3em] uppercase ${textColor} transition-colors duration-300`}
          >
            CRafina
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-widest uppercase font-medium transition-colors duration-300 hover:opacity-60 ${textColor} ${
                  pathname === link.href ? "opacity-60" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className={`relative p-2 transition-colors duration-300 hover:opacity-60 ${textColor}`}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href={isAuthenticated ? "/account" : "/login"}
              className={`hidden md:flex p-2 transition-colors duration-300 hover:opacity-60 ${textColor}`}
              aria-label="Account"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`md:hidden p-2 transition-colors duration-300 ${textColor}`}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-black/10 px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase font-medium hover:opacity-60"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isAuthenticated ? "/account" : "/login"}
              className="text-xs tracking-widest uppercase font-medium hover:opacity-60"
            >
              {isAuthenticated ? "Account" : "Sign In"}
            </Link>
          </div>
        )}
      </header>

      <CartSidebar />
    </>
  );
}
