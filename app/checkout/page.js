"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft, MapPin, Plus, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import useCartStore from "@/lib/store/cartStore";
import useUserStore from "@/lib/store/userStore";
import userAuthService from "@/lib/api/services/userAuthService";
import userOrdersService from "@/lib/api/services/userOrdersService";
import { setPostAuthRedirect } from "@/lib/utils/postAuthRedirect";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { isAuthenticated } = useUserStore();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [useNew, setUseNew] = useState(true);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  const cartTotal = items.reduce((s, i) => s + i.pricePerHour * i.hours, 0);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (!isAuthenticated) return;
    userAuthService
      .getProfile()
      .then((data) => {
        const addrs = data.addresses || data.user?.addresses || [];
        setAddresses(addrs);
        if (addrs.length > 0) {
          setUseNew(false);
          setSelectedAddressId(addrs[0].id || addrs[0]._id);
        }
      })
      .catch(() => {})
      .finally(() => setProfileLoading(false));
  }, [isAuthenticated]);

  const onSubmit = async (formData) => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const orderPayload = {
        services: items.map((i) => ({
          serviceName: i.serviceName,
          cost: parseFloat(i.pricePerHour),
          quantity: i.hours,
        })),
        phone: formData.phone,
      };

      if (useNew || addresses.length === 0) {
        orderPayload.country = formData.country;
        orderPayload.streetAddress = formData.streetAddress;
        orderPayload.postcode = formData.postcode;
        orderPayload.city = formData.city;
      } else {
        orderPayload.addressId = selectedAddressId;
      }

      const response = await userOrdersService.create(orderPayload);
      const orderNumber = response?.order?.orderNumber || response?.orderNumber;

      clearCart();
      toast.success("Order placed successfully!");

      if (orderNumber) {
        router.push(`/orders/${orderNumber}`);
      } else {
        router.push("/account");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.errors?.[0]?.msg ||
        "Failed to place order";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <main className="pt-24 min-h-[calc(100svh-1px)] flex flex-col">
          <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex-1 flex flex-col min-h-0">
            <div className="py-6 border-b border-black/10 shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors"
              >
                <ArrowLeft size={12} /> Continue Shopping
              </Link>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">
              <div className="border-b lg:border-b-0 lg:border-r border-black/10 py-12 lg:py-16 flex flex-col min-w-0 lg:pr-8 xl:pr-12">
              <p className="text-[10px] tracking-widest uppercase text-black/30 mb-8">
                Your Cart
              </p>
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center max-w-md">
                  <p className="font-display text-3xl md:text-4xl font-light mb-4">
                    Nothing here yet
                  </p>
                  <p className="text-black/45 text-sm mb-8">
                    Add services to your cart, then sign in to complete checkout.
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex w-fit bg-black text-white px-8 py-3.5 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors"
                  >
                    Browse Services
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-6 mb-10 flex-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start gap-4 pb-6 border-b border-black/10 last:border-0"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <Link
                            href={`/service/${item.id}`}
                            className="text-sm font-medium hover:underline underline-offset-4 decoration-black/25"
                          >
                            {item.serviceName}
                          </Link>
                          <p className="text-xs text-black/40 mt-1">
                            {item.hours}h × €{item.pricePerHour}/hr
                          </p>
                        </div>
                        <span className="text-sm font-medium shrink-0">
                          €{(item.pricePerHour * item.hours).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-black/10 pt-6 flex justify-between items-center mt-auto">
                    <span className="text-xs tracking-widest uppercase text-black/30">
                      Subtotal
                    </span>
                    <span className="font-display text-3xl font-light">
                      €{cartTotal.toLocaleString()}
                    </span>
                  </div>
                </>
              )}
              </div>

              <div className="py-12 lg:py-16 flex flex-col justify-center min-w-0 lg:pl-8 xl:pl-12">
                <p className="font-display text-4xl md:text-5xl font-light mb-6">
                  Sign In Required
                </p>
                <p className="text-black/50 text-sm mb-10 max-w-md">
                  You need an account to place an order. Sign in or create one — it only takes a minute.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/login"
                    onClick={() => setPostAuthRedirect("/checkout")}
                    className="text-center bg-black text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setPostAuthRedirect("/checkout")}
                    className="text-center border border-black text-black px-10 py-4 text-xs tracking-widest uppercase hover:bg-black/5 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-28 px-6 md:px-10 max-w-2xl mx-auto text-center">
          <p className="font-display text-5xl font-light mb-6">Cart is Empty</p>
          <p className="text-black/50 text-sm mb-10">
            Add services to your cart before checking out.
          </p>
          <Link
            href="/services"
            className="bg-black text-white px-10 py-4 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors"
          >
            Browse Services
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24">
        <div className="px-6 md:px-10 max-w-7xl mx-auto py-6 border-b border-black/10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors"
          >
            <ArrowLeft size={12} /> Continue Shopping
          </Link>
        </div>

        <div className="px-6 md:px-10 max-w-7xl mx-auto py-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <h1 className="font-display text-5xl font-light mb-12">Checkout</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Contact */}
              <div>
                <p className="text-[10px] tracking-widest uppercase text-black/30 mb-6">
                  Contact
                </p>
                <div>
                  <label className="block text-xs text-black/50 mb-2 tracking-wide">
                    Phone Number *
                  </label>
                  <input
                    {...register("phone", { required: "Phone is required" })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <p className="text-[10px] tracking-widest uppercase text-black/30 mb-6">
                  Billing Address
                </p>

                {!profileLoading && addresses.length > 0 && (
                  <div className="flex gap-3 mb-8">
                    <button
                      type="button"
                      onClick={() => setUseNew(false)}
                      className={`flex-1 py-3 text-xs tracking-widest uppercase border transition-colors ${
                        !useNew
                          ? "bg-black text-white border-black"
                          : "border-black/20 text-black/50 hover:border-black"
                      }`}
                    >
                      Saved Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseNew(true)}
                      className={`flex-1 py-3 text-xs tracking-widest uppercase border transition-colors ${
                        useNew
                          ? "bg-black text-white border-black"
                          : "border-black/20 text-black/50 hover:border-black"
                      }`}
                    >
                      <Plus size={12} className="inline mr-2" /> New Address
                    </button>
                  </div>
                )}

                {!useNew && addresses.length > 0 ? (
                  <div className="space-y-3">
                    {addresses.map((addr) => {
                      const addrId = addr.id || addr._id;
                      return (
                        <button
                          key={addrId}
                          type="button"
                          onClick={() => setSelectedAddressId(addrId)}
                          className={`w-full text-left p-5 border transition-colors ${
                            selectedAddressId === addrId
                              ? "border-black bg-black/5"
                              : "border-black/15 hover:border-black/40"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <MapPin size={14} className="mt-0.5 shrink-0 text-black/30" />
                            <div className="text-sm">
                              <p className="font-medium">{addr.streetAddress}</p>
                              <p className="text-black/50 text-xs mt-1">
                                {addr.city}, {addr.postcode}, {addr.country}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { field: "country", label: "Country", placeholder: "United States" },
                      { field: "city", label: "City", placeholder: "New York" },
                      { field: "streetAddress", label: "Street Address", placeholder: "123 Fifth Avenue", full: true },
                      { field: "postcode", label: "Postcode / ZIP", placeholder: "10001" },
                    ].map(({ field, label, placeholder, full }) => (
                      <div key={field} className={full ? "md:col-span-2" : ""}>
                        <label className="block text-xs text-black/50 mb-2 tracking-wide">
                          {label} *
                        </label>
                        <input
                          {...register(field, { required: `${label} is required` })}
                          placeholder={placeholder}
                          className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                        />
                        {errors[field] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[field].message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-4 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Placing Order...
                  </>
                ) : (
                  `Place Order — €${cartTotal.toLocaleString()}`
                )}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="border border-black/10 p-8">
              <p className="text-[10px] tracking-widest uppercase text-black/30 mb-6">
                Order Summary
              </p>
              <div className="space-y-5 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{item.serviceName}</p>
                  <p className="text-xs text-black/40 mt-0.5">
                      {item.hours}h × €{item.pricePerHour}/hr
                    </p>
                    </div>
                    <span className="text-sm font-medium">
                      €{(item.pricePerHour * item.hours).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/10 pt-5 flex justify-between items-center">
                <span className="text-xs tracking-widest uppercase text-black/30">
                  Total
                </span>
                    <span className="font-display text-3xl font-light">
                  €{cartTotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[10px] text-black/30 mt-4 leading-relaxed">
                Payment is processed securely after order confirmation.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
