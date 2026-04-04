import userAuthApi from "../userAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const userOrdersService = {
  async create(orderData) {
    const { data } = await userAuthApi.post("/orders", orderData, {
      baseURL: API_URL,
    });
    return data;
  },

  async getAll({ page, limit, search } = {}) {
    const { data } = await userAuthApi.get("/orders", {
      baseURL: API_URL,
      params: { page, limit, search },
    });
    return data;
  },

  async getByOrderNumber(orderNumber) {
    const { data } = await userAuthApi.get(
      `/orders/number/${orderNumber}`,
      { baseURL: API_URL }
    );
    return data;
  },

  async update(id, orderData) {
    const { data } = await userAuthApi.put(`/orders/${id}`, orderData, {
      baseURL: API_URL,
    });
    return data;
  },

  async remove(id) {
    const { data } = await userAuthApi.delete(`/orders/${id}`, {
      baseURL: API_URL,
    });
    return data;
  },
};

export default userOrdersService;
