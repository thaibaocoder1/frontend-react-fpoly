import axiosClient from "./AxiosClient";

const categoryApi = {
  async getAll(config = {}) {
    const url = "/catalogs";
    const request = axiosClient.get(url, { config });
    return await request;
  },
  async getOne(id) {
    const url = "/catalogs";
    const request = axiosClient.get(url + "/" + id);
    return await request;
  },
  async create(data) {
    const url = "/catalogs/save";
    const request = axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return await request;
  },
  async update(data) {
    const url = "/catalogs";
    const request = axiosClient.patch(url + "/" + data.id, data);
    return await request;
  },
  async remove(id) {
    const url = "/catalogs";
    const request = axiosClient.delete(url + "/" + id);
    return await request;
  },
};

export default categoryApi;
