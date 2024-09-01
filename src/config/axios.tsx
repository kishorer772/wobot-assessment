import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api-app-staging.wobot.ai/app',
});
const token = import.meta.env.VITE_TOKEN || '4ApVMIn5sTxeW7GQ5VWeWiy';
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});
