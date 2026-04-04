"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  ArrowLeft,
  Loader2,
  ExternalLink,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import userOrdersService from "@/lib/api/services/userOrdersService";
import { usePaycotWidget } from "@/lib/hooks/usePaycotWidget";

function StatusBadge({ paid }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] tracking-widest uppercase ${
        paid
          ? "bg-black text-white"
          : "bg-black/5 text-black/50 border border-black/15"
      }`}
    >
      {paid ? <CheckCircle2 size={10} /> : <Clock size={10} />}
      {paid ? "Paid" : "Awaiting Payment"}
    </span>
  );
}

export default function OrderPage() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    userOrdersService
      .getByOrderNumber(orderNumber)
      .then((data) => setOrder(data.order || data))
      .catch(() => setError("Order not found."))
      .finally(() => setLoading(false));
  }, [orderNumber]);

  const paymentHash =
    order?.payment?.paymentHash ?? order?.paymentHash ?? null;
  const isPaid = order?.payment?.isPaid ?? false;

  usePaycotWidget({ paymentHash, isPaid });

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

  if (error || !order) {
    return (
      <>
        <Header />
        <main className="pt-40 px-6 max-w-2xl mx-auto text-center">
          <p className="font-display text-4xl font-light mb-4">Order Not Found</p>
          <p className="text-black/50 text-sm mb-8">{error}</p>
          <Link href="/account" className="text-xs tracking-widest uppercase underline">
            Back to Account
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const services = order.services || [];
  const address = order.address;
  const createdAt = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="px-6 md:px-10 max-w-7xl mx-auto py-6 border-b border-black/10">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors"
          >
            <ArrowLeft size={12} /> My Account
          </Link>
        </div>

        <div className="px-6 md:px-10 max-w-7xl mx-auto py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14">
              <div>
                <p className="text-[10px] tracking-widest uppercase text-black/30 mb-2">
                  Order
                </p>
                <h1 className="font-display text-5xl font-light">
                  #{order.orderNumber}
                </h1>
                {createdAt && (
                  <p className="text-sm text-black/40 mt-2">{createdAt}</p>
                )}
              </div>
              <div className="flex flex-col items-start md:items-end gap-3">
                <StatusBadge paid={isPaid} />
                {!isPaid && (
                  <div className="flex gap-3">
                    {paymentHash && (
                      <button
                        id="paywithpaycot"
                        data-payment-hash={paymentHash}
                        type="button"
                        className="flex items-center gap-2 bg-black text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors"
                      >
                        <CreditCard size={13} /> Pay Now
                      </button>
                    )}
                    <Link
                      href={`/orders/${orderNumber}/sepa`}
                      className="flex items-center gap-2 border border-black text-black px-8 py-3 text-xs tracking-widest uppercase hover:bg-black/5 transition-colors"
                    >
                      <ExternalLink size={13} /> SEPA Transfer
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
              {/* Services */}
              <div>
                <p className="text-[10px] tracking-widest uppercase text-black/30 mb-6">
                  Services
                </p>
                <div className="border border-black/10">
                  {services.map((svc, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between p-6 border-b border-black/10 last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-sm">{svc.serviceName}</p>
                        <p className="text-xs text-black/40 mt-1">
                          {svc.quantity}h × €{parseFloat(svc.cost).toFixed(2)}/hr
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        €{(parseFloat(svc.cost) * svc.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-6 bg-black/3">
                    <span className="text-xs tracking-widest uppercase text-black/30">
                      Total
                    </span>
                    <span className="font-display text-3xl font-light">
                      €{parseFloat(order.totalCost || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar info */}
              <div className="space-y-6">
                {address && (
                  <div className="border border-black/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin size={14} className="text-black/30" />
                      <p className="text-[10px] tracking-widest uppercase text-black/30">
                        Billing Address
                      </p>
                    </div>
                    <p className="text-sm">{address.streetAddress}</p>
                    <p className="text-sm text-black/50 mt-1">
                      {address.city}, {address.postcode}
                    </p>
                    <p className="text-sm text-black/50">{address.country}</p>
                  </div>
                )}

                <div className="border border-black/10 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard size={14} className="text-black/30" />
                    <p className="text-[10px] tracking-widest uppercase text-black/30">
                      Payment
                    </p>
                  </div>
                  <StatusBadge paid={isPaid} />
                  {!isPaid && (
                    <p className="text-xs text-black/40 mt-3 leading-relaxed">
                      Complete your payment to begin your project. We accept card
                      via Pay Now or bank transfer via SEPA.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
