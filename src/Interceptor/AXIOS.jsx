import axios from "axios";

export const getToken = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token !== null) {
      return token;
    }
  } catch (error) {
    console.log(error);
  }
};

export const setToken = async (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = async (token) => {
  localStorage.removeItem("token");
};

const axiosInstance = axios.create({
  baseURL: "https://techrank.innovadorhub.com/api",
  // baseURL: "https://testing.innovadorhub.com/api"
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      removeToken().then(() => {
        window.location.href = "/login";
      });
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      removeToken().then(() => {
        window.location.href = "/login";
      });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
