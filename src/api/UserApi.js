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
};

export default userApi;
