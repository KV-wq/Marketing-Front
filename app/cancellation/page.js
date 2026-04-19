import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const sections = [
  {
    title: "Cancellation Window",
    content:
      "Orders may be cancelled without charge within 24 hours of placement, provided that no work has commenced. To cancel, contact us at info@crafina.io with your order number.",
  },
  {
    title: "After Work Has Commenced",
    content:
      "Once a project has entered active delivery, cancellation is subject to payment for all work completed to the date of cancellation. We will provide a detailed breakdown of work completed and hours used.",
  },
  {
    title: "Refunds",
    content:
      "Refunds for cancelled orders where no work has commenced will be processed within 5–10 business days via the original payment method. Partial refunds for partially completed work will be agreed on a case-by-case basis.",
  },
  {
    title: "Force Majeure",
    content:
      "In the event CRafina is unable to fulfil an order due to circumstances beyond our control, we will offer either a full refund or the option to pause and resume the project at a mutually agreed future date.",
  },
  {
    title: "Disputes",
    content:
      "If you are unsatisfied with our service, we encourage you to contact us first. We are committed to resolving any issues fairly and promptly before any formal dispute process is initiated.",
  },
  {
    title: "How to Cancel",
    content:
      "Send your cancellation request to info@crafina.io, including your order number and the reason for cancellation. We will confirm receipt within one business day.",
  },
];

export default function CancellationPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-28 px-6 md:px-10 max-w-3xl mx-auto">
        <div className="py-12 border-b border-black/10 mb-12">
          <p className="text-[10px] tracking-widest uppercase text-black/30 mb-3">
            Legal
          </p>
          <h1 className="font-display text-5xl font-light">Cancellation Policy</h1>
          <p className="text-sm text-black/40 mt-3">Last updated: January 1, 2025</p>
        </div>

        <div className="space-y-10 mb-16">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="font-medium text-base mb-3">{sec.title}</h2>
              <p className="text-sm text-black/60 leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>

        <div className="bg-black/4 border border-black/8 p-6">
          <p className="text-sm font-medium mb-2">Need to Cancel an Order?</p>
          <p className="text-sm text-black/50 leading-relaxed mb-4">
            Email us at{" "}
            <a
              href="mailto:info@crafina.io"
              className="text-black underline underline-offset-4"
            >
              info@crafina.io
            </a>{" "}
            or visit your account to view your order.
          </p>
          <Link
            href="/account"
            className="text-xs tracking-widests uppercase underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            View My Orders
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
