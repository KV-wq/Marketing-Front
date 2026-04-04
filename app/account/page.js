"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  User,
  ShoppingBag,
  MapPin,
  LogOut,
  Loader2,
  ChevronRight,
  Check,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import useUserStore from "@/lib/store/userStore";
import userAuthService from "@/lib/api/services/userAuthService";

const tabs = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "orders", label: "Orders", Icon: ShoppingBag },
  { id: "addresses", label: "Addresses", Icon: MapPin },
];

function ProfileTab({ profileData, onUpdate }) {
  const { user, setUser } = useUserStore();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: profileData?.user?.username || user?.username || "",
      firstName: profileData?.user?.firstName || user?.firstName || "",
      lastName: profileData?.user?.lastName || user?.lastName || "",
      phone: profileData?.user?.phone || user?.phone || "",
      companyName: profileData?.user?.companyName || user?.companyName || "",
    },
  });

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const response = await userAuthService.updateProfile(data);
      if (response.user) {
        setUser(response.user);
        onUpdate(response.user);
      }
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const email = profileData?.user?.email || user?.email;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-6">
      <div>
        <label className="block text-xs text-black/50 mb-2 tracking-wide">
          Email
        </label>
        <input
          value={email || ""}
          readOnly
          className="w-full border border-black/10 bg-black/3 px-4 py-3 text-sm text-black/40 cursor-not-allowed"
        />
      </div>

      {[
        { field: "username", label: "Username" },
        { field: "firstName", label: "First Name" },
        { field: "lastName", label: "Last Name" },
        { field: "phone", label: "Phone" },
        { field: "companyName", label: "Company Name" },
      ].map(({ field, label }) => (
        <div key={field}>
          <label className="block text-xs text-black/50 mb-2 tracking-wide">
            {label}
          </label>
          <input
            {...register(field)}
            className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-3 bg-black text-white px-10 py-3.5 text-xs tracking-widest uppercase hover:bg-black/80 transition-colors disabled:opacity-50"
      >
        {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
        Save Changes
      </button>
    </form>
  );
}

function OrdersTab({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag size={40} strokeWidth={1} className="mx-auto text-black/20 mb-4" />
        <p className="text-sm text-black/40 mb-6">No orders yet</p>
        <Link
          href="/services"
          className="text-xs tracking-widest uppercase underline underline-offset-4 hover:opacity-60"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl">
      {orders.map((order) => {
        const orderNumber = order.orderNumber || order._id;
        const isPaid = order.payment?.isPaid ?? false;
        const date = order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : null;

        return (
          <Link
            key={orderNumber}
            href={`/orders/${orderNumber}`}
            className="group flex items-center justify-between border border-black/10 p-6 hover:border-black transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <p className="font-medium text-sm">#{orderNumber}</p>
                <span
                  className={`text-[9px] tracking-widest uppercase px-2 py-0.5 ${
                    isPaid
                      ? "bg-black text-white"
                      : "bg-black/5 text-black/40"
                  }`}
                >
                  {isPaid ? "Paid" : "Pending"}
                </span>
              </div>
              {date && (
                <p className="text-xs text-black/40">{date}</p>
              )}
              {order.services && (
                <p className="text-xs text-black/40 mt-1 line-clamp-1">
                  {order.services.map((s) => s.serviceName).join(", ")}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {order.totalCost && (
                <span className="font-display text-xl font-light">
                  €{parseFloat(order.totalCost).toLocaleString()}
                </span>
              )}
              <ChevronRight
                size={16}
                className="text-black/20 group-hover:text-black transition-colors"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function AddressesTab({ addresses }) {
  if (!addresses || addresses.length === 0) {
    return (
      <div className="text-center py-20">
        <MapPin size={40} strokeWidth={1} className="mx-auto text-black/20 mb-4" />
        <p className="text-sm text-black/40 mb-2">No saved addresses</p>
        <p className="text-xs text-black/30">
          Addresses are saved automatically when you place an order.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      {addresses.map((addr, i) => (
        <div key={addr.id || addr._id || i} className="border border-black/10 p-6">
          <MapPin size={16} strokeWidth={1} className="text-black/30 mb-3" />
          <p className="text-sm font-medium">{addr.streetAddress}</p>
          <p className="text-sm text-black/50 mt-1">
            {addr.city}, {addr.postcode}
          </p>
          <p className="text-sm text-black/50">{addr.country}</p>
        </div>
      ))}
    </div>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { isAuthenticated, user, clearUser } = useUserStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    userAuthService
      .getProfile()
      .then((data) => setProfileData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await userAuthService.logout();
    clearUser();
    router.push("/");
    toast.success("Signed out");
  };

  if (!isAuthenticated) return null;

  const displayName =
    profileData?.user?.firstName ||
    user?.firstName ||
    profileData?.user?.username ||
    user?.username ||
    "Account";

  return (
    <>
      <Header />
      <main className="pt-24 min-h-screen">
        <div className="px-6 md:px-10 max-w-7xl mx-auto py-16">
          {/* Header */}
          <div className="flex items-start justify-between mb-14">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-black/30 mb-2">
                My Account
              </p>
              <h1 className="font-display text-5xl font-light">
                Welcome, {displayName}
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs tracking-widest uppercase text-black/40 hover:text-black transition-colors py-2"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-black/10 mb-12">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-4 text-xs tracking-widest uppercase transition-colors border-b-[1.5px] -mb-px ${
                  activeTab === id
                    ? "border-black text-black"
                    : "border-transparent text-black/35 hover:text-black"
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={28} className="animate-spin text-black/30" />
            </div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "profile" && (
                <ProfileTab
                  profileData={profileData}
                  onUpdate={(updated) =>
                    setProfileData((p) => ({ ...p, user: { ...p?.user, ...updated } }))
                  }
                />
              )}
              {activeTab === "orders" && (
                <OrdersTab orders={profileData?.orders} />
              )}
              {activeTab === "addresses" && (
                <AddressesTab addresses={profileData?.addresses} />
              )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
