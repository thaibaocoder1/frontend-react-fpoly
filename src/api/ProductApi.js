import axiosClient from "./AxiosClient";

const productApi = {
  getAll(params) {
    const controller = new AbortController();
    const url = "/products";
    const request = axiosClient.get(url, {
      params,
      signal: controller.signal,
    });
    const cancel = () => controller.abort();
    return { request, cancel };
  },
};

export default productApi;
