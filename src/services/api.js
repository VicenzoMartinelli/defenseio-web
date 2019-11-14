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

export const findAttendedModalities = async () => {
  return await api.get(`/contracting/attended-modalities`);
};

export const findModalities = async () => {
  return await api.get(`/contracting/modalities`);
};

export const saveAttendedModality = async (attendedModality) => {
  if (attendedModality.id === '') {
    return await api.post(`contracting/attended-modalities`, attendedModality);
  }
  else {
    return await api.put(`contracting/attended-modalities/${attendedModality.id}`, attendedModality);
  }
}

export const deleteAttendedModality = async (id) => {
  return await api.delete(`contracting/attended-modalities/${id}`);
}

export const findOpenedSolicitations = async () => {
  return await api.get(`/contracting/solicitations/opened`);
};

export const acceptSolicitation = async (id, numberOfEmployeers) => {
  console.log(numberOfEmployeers);
  
  return await api.put(`contracting/solicitations/${id}/accept`, {
    numberOfEmployees: numberOfEmployeers
  });
}

export const recuseSolicitation = async (id) => {
  console.log(id);
  return await api.put(`contracting/solicitations/${id}/recuse`);
}

export default api;
