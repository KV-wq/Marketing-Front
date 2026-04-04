import userAuthApi from "../userAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const userAuthService = {
  async login(login, password) {
    const { data } = await userAuthApi.post("/login", { login, password });
    if (typeof window !== "undefined") {
      localStorage.setItem("userAccessToken", data.accessToken);
      localStorage.setItem("userRefreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  async logout() {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("userRefreshToken")
        : null;
    try {
      await userAuthApi.post("/logout", { refreshToken });
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("userAccessToken");
        localStorage.removeItem("userRefreshToken");
        localStorage.removeItem("user");
      }
    }
  },

  async getProfile() {
    const { data } = await userAuthApi.get("/profile");
    return data;
  },

  async updateProfile(profileData) {
    const { data } = await userAuthApi.put("/profile", profileData);
    return data;
  },

  async register({ username, email, password, firstName, lastName }) {
    const response = await fetch(`${API_URL}/user-auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, firstName, lastName }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return data;
  },

  async verifyEmail(token) {
    const response = await fetch(
      `${API_URL}/user-auth/verify-email?token=${token}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    if (typeof window !== "undefined") {
      if (data.accessToken) localStorage.setItem("userAccessToken", data.accessToken);
      if (data.refreshToken) localStorage.setItem("userRefreshToken", data.refreshToken);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },
};

export default userAuthService;
