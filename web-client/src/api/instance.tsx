import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL as string;
const ACCESS_TOKEN_KEY = process.env.REACT_APP_ACCESS_TOKEN_KEY as string;

const UnauthenticatedNotedAPI = axios.create({
  baseURL,
  headers: { "content-type": "application/json" },
  timeout: 30000,
});

const AuthenthicatedNotedAPI = axios.create({
  baseURL,
  headers: { "content-type": "application/json" },
  timeout: 30000,
});

AuthenthicatedNotedAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("noted/v2-token");
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  };

  return newConfig;
});

export { AuthenthicatedNotedAPI, UnauthenticatedNotedAPI };
