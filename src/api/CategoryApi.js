import axiosClient from "./AxiosClient";

const categoryApi = {
  getAll() {
    const controller = new AbortController();
    const url = "/catalogs";
    const request = axiosClient.get(url, {
      signal: controller.signal,
    });
    const cancel = () => controller.abort();
    return { request, cancel };
  },
};

export default categoryApi;
