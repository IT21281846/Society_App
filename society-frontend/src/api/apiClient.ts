import axios from 'axios';
import { getAuthToken } from '../authHelpers';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    // Cast headers as any to bypass strict typing
    (config.headers as any) = {
      ...(config.headers as any),
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

export default api;
