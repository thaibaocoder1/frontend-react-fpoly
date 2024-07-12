import axiosClient from "./AxiosClient";

const userApi = {
  register(info) {
    const url = "/users";
    return axiosClient.post(`${url}/save`, info);
  },
  login(info) {
    const url = "/users";
    return axiosClient.post(`${url}/login`, info);
  },
  logout(data) {
    const url = "/users";
    return axiosClient.post(`${url}/logout/${data.id}`, data);
  },
  async getAll(params, config = {}) {
    const url = "/users";
    const request = axiosClient.get(url, { ...params, config });
    return await request;
  },
  async getOne(id) {
    const url = "/users";
    const request = axiosClient.get(url + "/" + id);
    return await request;
  },
  async create(data) {
    const url = "/users";
    const request = axiosClient.post(`${url}/create`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return await request;
  },
  async update(data) {
    const url = "/users";
    const request = axiosClient.patch(`${url}/update/${data.get("id")}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return await request;
  },
};

export default userApi;
