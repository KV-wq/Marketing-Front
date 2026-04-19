import Link from "next/link";

const footerLinks = {
  Services: [
    { href: "/services", label: "All Services" },
    { href: "/service/seo-optimization", label: "SEO Optimization" },
    { href: "/service/performance-marketing", label: "Performance Marketing" },
    { href: "/service/brand-strategy", label: "Brand Strategy" },
    { href: "/service/marketing-analytics", label: "Analytics" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  Account: [
    { href: "/register", label: "Create Account" },
    { href: "/login", label: "Sign In" },
    { href: "/account", label: "My Account" },
  ],
  Legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/cancellation", label: "Cancellation Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-1">
            <span className="font-display text-3xl font-light tracking-[0.3em] uppercase">
              CRafina
            </span>
            <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-xs">
              The Art of Marketing. We engineer growth for ambitious brands
              through data-driven strategy and creative excellence.
            </p>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-[10px] tracking-widest uppercase text-white/30 mb-5">
                {group}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-[10px] tracking-widest uppercase text-white/30 mb-5">
              Details
            </p>
            <div className="space-y-3 text-sm text-white/60 leading-relaxed">
              <p className="text-white">NovaCore Group UAB</p>
              <p className="font-mono text-xs text-white/50">307628943</p>
              <p className="text-white/60">
                Registracijos adresas Šiauliai, Gytarių g. 21, LT-78398
              </p>
              <a
                href="mailto:info@crafina.io"
                className="inline-block text-sm text-white/60 hover:text-white transition-colors"
              >
                info@crafina.io
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/20 tracking-widest">
            © {new Date().getFullYear()} CRafina. All rights reserved.
          </p>
          <a
            href="mailto:info@crafina.io"
            className="text-xs text-white/20 tracking-widest hover:text-white/60 transition-colors"
          >
            info@crafina.io
          </a>
        </div>
      </div>
    </footer>
  );
}
