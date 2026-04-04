import api from "../axios";

const adminUsersService = {
  async getAll({ page, limit, search } = {}) {
    const { data } = await api.get("/users", {
      params: { page, limit, search },
    });
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  async update(id, userData) {
    const { data } = await api.put(`/users/${id}`, userData);
    return data;
  },

  async remove(id) {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  },
};

export default adminUsersService;
