import axiosClient from "./AxiosClient";

const orderApi = {
  async getAll(signal = {}) {
    const url = "/orders";
    const request = await axiosClient.get(`${url}`, { signal });
    return request;
  },
  async getAllWithId(id, config, signal = {}) {
    const url = "/orders";
    const request = await axiosClient.get(`${url}/user/${id}`, {
      ...config,
      signal,
    });
    return request;
  },
  async getOne(id, signal = {}) {
    const url = "/orders";
    const request = await axiosClient.get(`${url}/${id}`, { signal });
    return request;
  },
  async add(payload) {
    const url = "/orders";
    const request = await axiosClient.post(`${url}/save`, payload);
    return request;
  },
};

export default orderApi;
