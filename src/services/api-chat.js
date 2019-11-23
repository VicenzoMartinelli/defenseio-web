import axios from 'axios';
import * as auth from './auth';
import { HubConnectionBuilder, HttpTransportType } from '@aspnet/signalr';

const baseUrl = 'http://localhost:5010';

const api = axios.create({
  baseURL: baseUrl
});

api.interceptors.request.use(function (reqConfig) {
  var token = auth.getToken();

  if (token) {
    reqConfig.headers.authorization = "Bearer " + token;
  }

  return reqConfig;
});

export const buildHubConnection = () => {
  const token = auth.getToken();

  return new HubConnectionBuilder()
    .withUrl(`${baseUrl}/chat?access_token=${token}`, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    })
    .build();
}

export const findMessagesFromUser = async (userId) => {
  try {
    console.log('nao to entendo', userId)
    const res = await api.get(`/messages/${userId}`);

    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};

export const findNegociations = async () => {
  try {
    const res = await api.get(`/messages`);

    return Promise.resolve(res.data);
  } catch (err) {
    throw err.response.data.errors[0].description;
  }
};