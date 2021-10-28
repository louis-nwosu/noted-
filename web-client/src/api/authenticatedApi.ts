import Axios from "axios";

export const authenticatedApi = Axios.create({
  //TODO: add base url in .env variable
  baseURL: "http://localhost:8080/noted",
  timeout: 1000,
  headers: {
    "content-type": "application/json",
  },
});

authenticatedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("noted-l300-key");
  const newConfig = {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  };

  return newConfig;
});

export { authenticatedApi as default };
