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
  logout(id) {
    const url = "/users";
    return axiosClient.get(`${url}/logout/${id}`);
  },
};

export default userApi;
