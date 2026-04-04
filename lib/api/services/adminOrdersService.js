import api from "../axios";

const adminOrdersService = {
  async getAll({ page, limit, search } = {}) {
    const { data } = await api.get("/orders", {
      params: { page, limit, search },
    });
    return data;
  },

  async update(id, orderData) {
    const { data } = await api.put(`/orders/${id}`, orderData);
    return data;
  },

  async remove(id) {
    const { data } = await api.delete(`/orders/${id}`);
    return data;
  },
};

export default adminOrdersService;
