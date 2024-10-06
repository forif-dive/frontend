import axios from "axios";

const BASE_URL = "http://3.36.99.77:8000";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export { instance };
