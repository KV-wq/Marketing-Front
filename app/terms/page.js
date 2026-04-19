import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using CRafina's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "Services",
    content:
      "CRafina provides digital marketing services including but not limited to SEO, paid media, brand strategy, content creation, and analytics. All services are subject to separate service agreements and scopes of work agreed upon between CRafina and the client.",
  },
  {
    title: "Account Registration",
    content:
      "To access certain features of our platform, you must register for an account. You agree to provide accurate, current, and complete information and to keep your login credentials confidential. You are responsible for all activities under your account.",
  },
  {
    title: "Payment & Billing",
    content:
      "Services are billed according to the hourly rates and quantities agreed at checkout. All prices are in USD. Payment is due upon order placement via our secure payment widget or SEPA bank transfer. We reserve the right to withhold service commencement until payment is confirmed.",
  },
  {
    title: "Intellectual Property",
    content:
      "Upon full payment, all deliverables created by CRafina specifically for a client become the client's property. CRafina retains the right to use work in its portfolio unless otherwise agreed in writing.",
  },
  {
    title: "Confidentiality",
    content:
      "Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of an engagement. This obligation survives the termination of any service agreement.",
  },
  {
    title: "Limitation of Liability",
    content:
      "CRafina's total liability for any claim arising out of these terms shall not exceed the total fees paid by the client in the preceding three months. CRafina is not liable for indirect, incidental, or consequential damages.",
  },
  {
    title: "Governing Law",
    content:
      "These Terms are governed by the laws of the State of New York, USA. Any disputes shall be resolved exclusively in the courts of New York County.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-28 px-6 md:px-10 max-w-3xl mx-auto">
        <div className="py-12 border-b border-black/10 mb-12">
          <p className="text-[10px] tracking-widest uppercase text-black/30 mb-3">
            Legal
          </p>
          <h1 className="font-display text-5xl font-light">Terms of Service</h1>
          <p className="text-sm text-black/40 mt-3">
            Last updated: January 1, 2025
          </p>
        </div>

        <div className="space-y-10">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="font-medium text-base mb-3">{sec.title}</h2>
              <p className="text-sm text-black/60 leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
