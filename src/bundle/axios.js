import axios from 'axios';
import { getUserFromSessionStorage } from './sessionStorage';

const apiFetch = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});

apiFetch.interceptors.request.use((config) => {
  const user = getUserFromSessionStorage();
  if (user?.email) {
    config.headers['Authorization'] = `Bearer ${user?.token}`;
  }
  return config;
});

export default apiFetch;
