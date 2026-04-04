import api from "../axios";

const adminAuthService = {
  async login(login, password) {
    const { data } = await api.post("/auth/login", { login, password });
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }
    return data;
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
};

export default adminAuthService;
