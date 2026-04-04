"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Pencil, Trash2, Loader2, Search, ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import adminOrdersService from "@/lib/api/services/adminOrdersService";

function EditModal({ order, onClose, onSave }) {
  const [services, setServices] = useState(
    JSON.stringify(order.services || [], null, 2)
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      let parsed;
      try {
        parsed = JSON.parse(services);
      } catch {
        toast.error("Invalid JSON in services");
        setSaving(false);
        return;
      }
      await adminOrdersService.update(order._id || order.id, { services: parsed });
      toast.success("Order updated");
      onSave();
      onClose();
    } catch {
      toast.error("Failed to update order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg mx-4 p-8"
      >
        <div className="flex justify-between items-center mb-6">
          <p className="font-medium">Edit Order #{order.orderNumber}</p>
          <button onClick={onClose} className="p-1 hover:bg-black/5 transition-colors">
            <X size={18} />
          </button>
        </div>
        <label className="block text-xs text-black/50 mb-2 tracking-wide">
          Services (JSON)
        </label>
        <textarea
          value={services}
          onChange={(e) => setServices(e.target.value)}
          rows={10}
          className="w-full border border-black/20 px-4 py-3 text-xs font-mono focus:outline-none focus:border-black transition-colors resize-none"
        />
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-black text-white py-3 text-xs tracking-widests uppercase hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-black/20 py-3 text-xs tracking-widests uppercase hover:bg-black/5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editingOrder, setEditingOrder] = useState(null);
  const limit = 20;

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminOrdersService.getAll({ page, limit, search });
      setOrders(data.orders || data.data || []);
      setTotal(data.total || data.count || 0);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const t = setTimeout(fetchOrders, 300);
    return () => clearTimeout(t);
  }, [fetchOrders]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this order?")) return;
    try {
      await adminOrdersService.remove(id);
      toast.success("Order deleted");
      fetchOrders();
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light">Orders</h1>
          <p className="text-xs text-black/40 mt-1">{total} total orders</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search orders..."
          className="w-full border border-black/20 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={24} className="animate-spin text-black/30" />
        </div>
      ) : (
        <>
          <div className="bg-white border border-black/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-black/10">
                  {["Order #", "Services", "Total", "Status", "Date", ""].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-[10px] tracking-widests uppercase text-black/30 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-sm text-black/30">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const id = order._id || order.id;
                    const isPaid = order.payment?.isPaid ?? false;
                    const date = order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                      : "—";
                    return (
                      <tr key={id} className="border-b border-black/5 hover:bg-black/2 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">#{order.orderNumber || id}</td>
                        <td className="px-6 py-4 text-sm text-black/50 max-w-[200px] truncate">
                          {(order.services || []).map((s) => s.serviceName).join(", ") || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          €{parseFloat(order.totalCost || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[9px] tracking-widests uppercase px-2 py-0.5 ${isPaid ? "bg-black text-white" : "bg-black/5 text-black/40"}`}>
                            {isPaid ? "Paid" : "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-black/40">{date}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingOrder(order)}
                              className="p-1.5 hover:bg-black/5 transition-colors text-black/30 hover:text-black"
                            >
                              <Pencil size={13} />
                            </button>
                            <button
                              onClick={() => handleDelete(id)}
                              className="p-1.5 hover:bg-red-50 transition-colors text-black/30 hover:text-red-500"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-xs text-black/40">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 border border-black/20 hover:border-black transition-colors disabled:opacity-30"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 border border-black/20 hover:border-black transition-colors disabled:opacity-30"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {editingOrder && (
        <EditModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={fetchOrders}
        />
      )}
    </div>
  );
}
