import axiosClient from "./AxiosClient";

const userApi = {
  register(info) {
    const url = "/users";
    return axiosClient.post(`${url}/register`, info);
  },
  active(id) {
    const url = "/users";
    return axiosClient.post(`${url}/active`, { id });
  },
  forgot(email) {
    const url = "/users";
    return axiosClient.post(`${url}/forgot`, email);
  },
  reset(values) {
    const url = "/users";
    return axiosClient.post(`${url}/change`, values);
  },
  change(values) {
    const url = "/users";
    return axiosClient.patch(`${url}/update-fields/${values.id}`, values);
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
    const request = axiosClient.get(url, { ...params, signal: config });
    return await request;
  },
  async getAllTrash(params, config = {}) {
    const url = "/users";
    const request = axiosClient.get(`${url}/trash`, {
      ...params,
      signal: config,
    });
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
  async updateField(data) {
    const url = "/users";
    const request = axiosClient.patch(
      `${url}/cancel-count/${data.userId}`,
      data
    );
    return await request;
  },
  async delete(id) {
    const url = "/users";
    const request = axiosClient.delete(`${url}/soft/${id}`);
    return await request;
  },
  async destroy(id) {
    const url = "/users";
    const request = axiosClient.delete(`${url}/${id}`);
    return await request;
  },
  async recover(id) {
    const url = "/users";
    const request = axiosClient.patch(`${url}/restore`, { id });
    return await request;
  },
  async requestRecover(values) {
    const url = "/users";
    const request = axiosClient.post(`${url}/recover`, values);
    return await request;
  },
  async confirmRecover(values) {
    const url = "/users";
    const request = axiosClient.post(`${url}/confirm-recover`, values);
    return await request;
  },
  async refreshToken() {
    const url = "/refresh";
    const request = axiosClient.get(`${url}`);
    return await request;
  },
};

export default userApi;
