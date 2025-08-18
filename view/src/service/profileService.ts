import api from './api';

export const getProfile = async (id: string | number | undefined) => {
  return await api.get(`/profile/${id}`);
};

export const getProfileImg = async (id: string | number | undefined) => {  
  return api.get(`/profile-img/${id}`, {
    responseType: 'blob',
  });
};

export const postProfileImg = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file); 
  return api.post(`/profile-img`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};