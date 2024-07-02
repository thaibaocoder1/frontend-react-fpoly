import axiosClient from "./AxiosClient";

const productApi = {
  getWithParams(params, flag = false) {
    const controller = new AbortController();
    const url = flag ? "/products/v1" : "/products";
    const request = axiosClient.get(url, {
      ...params,
      signal: controller.signal,
    });
    const cancel = () => controller.abort();
    return { request, cancel };
  },
  getAll() {
    const controller = new AbortController();
    const url = "/products/all";
    const request = axiosClient.get(url, {
      signal: controller.signal,
    });
    const cancel = () => controller.abort();
    return { request, cancel };
  },
  getByCategory(slug) {
    const controller = new AbortController();
    const url = "/products/list";
    const request = axiosClient.get(`${url}/${slug}`, {
      signal: controller.signal,
    });
    const cancel = () => controller.abort();
    return { request, cancel };
  },
  getRelatedProducts(categoryID) {
    const controller = new AbortController();
    const url = "/products/list";
    const request = axiosClient.get(`${url}/${categoryID}`, {
      signal: controller.signal,
    });
    const cancel = () => controller.abort();
    return { request, cancel };
  },
  getOne(id) {
    const url = "/products";
    return axiosClient.get(`${url}/${id}`);
  },
};

export default productApi;
