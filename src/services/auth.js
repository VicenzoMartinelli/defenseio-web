import decode from "jwt-decode";
import api from "./api";

export const login = async data => {
  try {
    const res = await api.post(`/auth/sign-in`, data);

    if (res.data.isSuccess) {
      setToken(res.data.body.accessToken);
    }

    return Promise.resolve(res);
  } catch (err) {
    throw err.response.data.erros[0].description;
  }
};

export const loggedIn = () => {
  const token = getToken();

  return token && !isTokenExpired(token);
};

export const register = async data => {
  try {
    const res = await api.post(`/auth/2/register`, data);

    if (res.data.isSuccess) {
      setToken(res.data.body.accessToken);
    }

    return Promise.resolve(res);
  } catch (err) {
    throw err.response.data.erros[0].description;
  }
};

export const isTokenExpired = token => {
  try {
    const decoded = decode(token);

    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};

export const setToken = idToken => localStorage.setItem("dfs_jwt_tkn", idToken);

export const getToken = () => localStorage.getItem("dfs_jwt_tkn");

export const logout = () => localStorage.removeItem("dfs_jwt_tkn");

export const getConfirm = () => {
  const confirm = decode(getToken());

  return confirm;
};
