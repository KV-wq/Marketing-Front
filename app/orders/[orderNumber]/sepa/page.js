"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Loader2, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import userOrdersService from "@/lib/api/services/userOrdersService";

const bankDetails = [
  { label: "Bank Name", value: "Barclays Bank PLC" },
  { label: "Account Holder", value: "FORMA Agency Ltd." },
  { label: "IBAN", value: "GB29 NWBK 6016 1331 9268 19" },
  { label: "BIC / SWIFT", value: "BARCGB22" },
  { label: "Sort Code", value: "60-16-13" },
];

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between py-4 border-b border-black/10 last:border-b-0">
      <div>
        <p className="text-[10px] tracking-widest uppercase text-black/30 mb-1">
          {label}
        </p>
        <p className="text-sm font-medium font-mono">{value}</p>
      </div>
      <button
        onClick={copy}
        className="p-2 hover:bg-black/5 transition-colors text-black/30 hover:text-black"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}

export default function SepaPage() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userOrdersService
      .getByOrderNumber(orderNumber)
      .then((data) => setOrder(data.order || data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [orderNumber]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-40 flex justify-center">
          <Loader2 size={28} className="animate-spin text-black/30" />
        </main>
      </>
    );
  }

  const totalCost = order ? parseFloat(order.totalCost || 0).toLocaleString() : "—";
  const reference = `FORMA-${orderNumber}`;

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="px-6 md:px-10 max-w-3xl mx-auto py-6 border-b border-black/10">
          <Link
            href={`/orders/${orderNumber}`}
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors"
          >
            <ArrowLeft size={12} /> Back to Order
          </Link>
        </div>

        <div className="px-6 md:px-10 max-w-3xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Building2 size={22} strokeWidth={1} className="text-black/30" />
              <p className="text-[10px] tracking-widest uppercase text-black/30">
                Bank Transfer
              </p>
            </div>

            <h1 className="font-display text-5xl font-light mb-4">
              SEPA Transfer
            </h1>
            <p className="text-black/50 text-sm leading-relaxed mb-12 max-w-lg">
              Transfer the exact amount below to our bank account. Please
              include the payment reference so we can match your transfer to
              your order. Processing typically takes 1–3 business days.
            </p>

            {/* Amount highlight */}
            <div className="bg-black text-white p-8 mb-10">
              <p className="text-[10px] tracking-widest uppercase text-white/40 mb-2">
                Amount to Transfer
              </p>
              <p className="font-display text-5xl font-light">€{totalCost}</p>
              <p className="text-white/40 text-xs mt-2">EUR — exact amount required</p>
            </div>

            {/* Bank details */}
            <div className="border border-black/10 p-8 mb-8">
              <p className="text-[10px] tracking-widest uppercase text-black/30 mb-2">
                Bank Details
              </p>
              {bankDetails.map((d) => (
                <CopyField key={d.label} label={d.label} value={d.value} />
              ))}
              <CopyField label="Payment Reference" value={reference} />
            </div>

            <div className="bg-black/4 border border-black/8 p-6 mb-10">
              <p className="text-xs text-black/50 leading-relaxed">
            <strong className="text-black">Important:</strong> Always
            include <strong className="font-mono">{reference}</strong> as
            the payment reference and transfer the exact EUR amount shown above.
            Transfers without a reference may be delayed. Once your payment is
            received and confirmed, your project will begin immediately.
          </p>
            </div>

            <Link
              href={`/orders/${orderNumber}`}
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors"
            >
              I've Initiated the Transfer
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
