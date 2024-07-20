import axiosClient from "./AxiosClient";

const orderApi = {
  async getAll(config, signal = {}) {
    const url = "/orders";
    const request = await axiosClient.get(`${url}`, { ...config, signal });
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
  async getOneWithId(id, signal = {}) {
    const url = "/orders";
    const request = await axiosClient.get(`${url}/${id}`, {
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
  async cancel(payload) {
    const url = "/orders";
    const request = await axiosClient.patch(
      `${url}/update/${payload.id}`,
      payload
    );
    return request;
  },
  async print(id) {
    const url = "/orders";
    const request = await axiosClient.get(`${url}/invoice/${id}`);
    return request;
  },
};

export default orderApi;
