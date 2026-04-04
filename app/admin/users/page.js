"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Pencil, Trash2, Loader2, Search, ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import adminUsersService from "@/lib/api/services/adminUsersService";

function EditModal({ user, onClose, onSave }) {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      companyName: user.companyName || "",
      emailVerified: user.emailVerified ?? false,
    },
  });

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await adminUsersService.update(user._id || user.id, {
        ...data,
        emailVerified: data.emailVerified === true || data.emailVerified === "true",
      });
      toast.success("User updated");
      onSave();
      onClose();
    } catch {
      toast.error("Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { field: "username", label: "Username" },
    { field: "firstName", label: "First Name" },
    { field: "lastName", label: "Last Name" },
    { field: "email", label: "Email" },
    { field: "phone", label: "Phone" },
    { field: "companyName", label: "Company" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg mx-4 p-8 overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <p className="font-medium">Edit User</p>
          <button onClick={onClose} className="p-1 hover:bg-black/5 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map(({ field, label }) => (
            <div key={field}>
              <label className="block text-xs text-black/50 mb-1.5 tracking-wide">
                {label}
              </label>
              <input
                {...register(field)}
                className="w-full border border-black/20 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
          ))}

          <div className="flex items-center gap-3">
            <input
              {...register("emailVerified")}
              type="checkbox"
              id="emailVerified"
              className="w-4 h-4"
            />
            <label htmlFor="emailVerified" className="text-sm text-black/60">
              Email Verified
            </label>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-black text-white py-3 text-xs tracking-widests uppercase hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-black/20 py-3 text-xs tracking-widests uppercase hover:bg-black/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editingUser, setEditingUser] = useState(null);
  const limit = 20;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminUsersService.getAll({ page, limit, search });
      setUsers(data.users || data.data || []);
      setTotal(data.total || data.count || 0);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const t = setTimeout(fetchUsers, 300);
    return () => clearTimeout(t);
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await adminUsersService.remove(id);
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-light">Users</h1>
          <p className="text-xs text-black/40 mt-1">{total} total users</p>
        </div>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search users..."
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
                  {["Name", "Email", "Username", "Company", "Verified", ""].map((h) => (
                    <th key={h} className="text-left px-6 py-4 text-[10px] tracking-widests uppercase text-black/30 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-sm text-black/30">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const id = user._id || user.id;
                    return (
                      <tr key={id} className="border-b border-black/5 hover:bg-black/2 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium">
                          {[user.firstName, user.lastName].filter(Boolean).join(" ") || "—"}
                        </td>
                        <td className="px-6 py-4 text-sm text-black/50">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-black/50">{user.username || "—"}</td>
                        <td className="px-6 py-4 text-sm text-black/50">{user.companyName || "—"}</td>
                        <td className="px-6 py-4">
                          <span className={`text-[9px] tracking-widests uppercase px-2 py-0.5 ${user.emailVerified ? "bg-black text-white" : "bg-black/5 text-black/40"}`}>
                            {user.emailVerified ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingUser(user)}
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

      {editingUser && (
        <EditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={fetchUsers}
        />
      )}
    </div>
  );
}
