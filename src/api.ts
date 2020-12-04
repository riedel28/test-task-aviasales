import axios from "axios";

const api = axios.create({
  baseURL: "https://front-test.beta.aviasales.ru/",
});

export const getSearchId = async () => {
  const response = await api.get("/search");
  const { searchId } = response.data;

  return searchId;
};

export const getTickets = async (amount = 10) => {
  const searchId = await getSearchId();
  const response = await api.get(`/tickets?searchId=${searchId}`);

  return response.data.tickets.slice(0, amount);
};

export default api;
