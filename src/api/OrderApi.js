import axiosClient from "./AxiosClient";

const orderApi = {
  async add(payload) {
    const url = "/orders";
    const request = await axiosClient.post(`${url}/save`, payload);
    return request;
  },
};

export default orderApi;
