import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  init() {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : null;
      set({ user, isAuthenticated: !!user });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },

  setUser(user) {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
    set({ user, isAuthenticated: !!user });
  },

  clearUser() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userAccessToken");
      localStorage.removeItem("userRefreshToken");
      localStorage.removeItem("user");
    }
    set({ user: null, isAuthenticated: false });
  },

  updateUser(patch) {
    set((state) => {
      const updated = { ...state.user, ...patch };
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(updated));
      }
      return { user: updated };
    });
  },
}));

export default useUserStore;
