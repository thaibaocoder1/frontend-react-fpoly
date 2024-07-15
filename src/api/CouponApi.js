import axiosClient from "./AxiosClient";

const couponApi = {
  async getAll(params, signal = {}) {
    const url = "/coupons";
    const request = await axiosClient.get(url, { ...params, signal });
    return request;
  },
  async getOne(id, signal = {}) {
    const url = "/coupons";
    const request = await axiosClient.get(`${url}/${id}`, { signal });
    return request;
  },
  async check(name) {
    const url = "/coupons";
    const request = await axiosClient.post(`${url}/check`, { name });
    return request;
  },
  async add(data) {
    const url = "/coupons";
    const request = await axiosClient.post(`${url}/save`, data);
    return request;
  },
  async update(data) {
    const url = "/coupons";
    const request = await axiosClient.patch(`${url}/${data.id}`, data);
    return request;
  },
  async remove(id) {
    const url = "/coupons";
    const request = await axiosClient.delete(`${url}/${id}`);
    return request;
  },
};

export default couponApi;
