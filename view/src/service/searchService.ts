import api from './api';

export const search = async (q: string) => {
  return await api.get(`/search?q=${q}`);
};