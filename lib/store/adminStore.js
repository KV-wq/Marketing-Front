import { create } from "zustand";

function loadAdminAuth() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
}

const useAdminStore = create((set) => ({
  isAuthenticated: loadAdminAuth(),

  setAuthenticated(value) {
    set({ isAuthenticated: value });
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    set({ isAuthenticated: false });
  },
}));

export default useAdminStore;
