import axiosClient from "./AxiosClient";

const orderDetailApi = {
  async add(payload) {
    const url = "/details";
    const request = await axiosClient.post(`${url}/save`, payload);
    return request;
  },
};

export default orderDetailApi;
