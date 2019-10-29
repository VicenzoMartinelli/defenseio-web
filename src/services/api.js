import axios from "axios";
import * as auth from "./auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api/"
});

api.interceptors.request.use(
  reqConfig => {
    reqConfig.headers.authorization = "Bearer " + auth.getToken();

    return reqConfig;
  },
  err => Promise.reject(err)
);

export const findDistricts = async () => {
  return await api.get(`/geographic/districts/`);
};

export const findCities = async (districtId) => {
  return await api.get(`/geographic/districts/${districtId}/cities`);
};
export default api;
