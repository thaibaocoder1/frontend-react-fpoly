import axiosClient from "./AxiosClient";

const orderDetailApi = {
  async getOne(id, signal = {}) {
    const url = "/details";
    const request = await axiosClient.get(`${url}/${id}`, { signal });
    return request;
  },
  async add(payload) {
    const url = "/details";
    const request = await axiosClient.post(`${url}/save`, payload);
    return request;
  },
};

export default orderDetailApi;
