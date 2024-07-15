import StorageKeys from "@constants/StorageKeys";
import axios, { CanceledError } from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8888/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  function (config) {
    const access_token =
      localStorage && localStorage.getItem(StorageKeys.TOKEN);
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    if (error instanceof CanceledError) return Promise.reject(error);
    const {
      config,
      response: { data, status },
    } = error;

    if (
      status === 401 &&
      !config._retry &&
      data.message === "Unauthorization"
    ) {
      config._retry = true;
      try {
        const { accessToken } = await refreshToken();
        config.headers.Authorization = `Bearer ${accessToken}`;
        return axiosClient(config);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(data);
  }
);

async function refreshToken() {
  try {
    const response = await axiosClient.get("/refresh");
    localStorage.setItem(StorageKeys.TOKEN, response.accessToken);
    return response;
  } catch (error) {
    console.error("Unable to refresh token:", error);
    throw error;
  }
}

export default axiosClient;
