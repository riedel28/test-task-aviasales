import axios from "axios";

const api = axios.create({
  baseURL: "https://front-test.beta.aviasales.ru/",
});

export default api;
