import Axios from "axios";

export const unauthenticatedApi = Axios.create({
  //TODO: add base url in .env variable
  baseURL: "http://localhost:8080/noted",
  timeout: 1000,
  headers: {
    "content-type": "application/json",
  },
});

export { unauthenticatedApi as default };
