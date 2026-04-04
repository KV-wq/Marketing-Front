"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGrid, Users, LogOut } from "lucide-react";
import useAdminStore from "@/lib/store/adminStore";
import adminAuthService from "@/lib/api/services/adminAuthService";

const navLinks = [
  { href: "/admin/orders", label: "Orders", Icon: LayoutGrid },
  { href: "/admin/users", label: "Users", Icon: Users },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAdminStore();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;
  if (!isAuthenticated) return null;

  const handleLogout = () => {
    adminAuthService.logout();
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex">
      <aside className="w-56 bg-[#0a0a0a] flex flex-col fixed top-0 left-0 h-full z-20">
        <div className="px-6 py-6 border-b border-white/10">
          <span className="font-display text-lg tracking-[0.25em] uppercase text-white">
            FORMA
          </span>
          <p className="text-[9px] tracking-widests text-white/20 mt-0.5">Admin</p>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navLinks.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs tracking-widest transition-colors ${
                pathname.startsWith(href)
                  ? "text-white bg-white/10"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-5 text-xs tracking-widests text-white/30 hover:text-white transition-colors border-t border-white/10"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </aside>
      <main className="ml-56 flex-1 min-h-screen">{children}</main>
    </div>
  );
}
