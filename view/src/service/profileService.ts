import api from './api';

type profileParams = {
  id?: string | number | undefined;
  docNum?: string | number | undefined;
  employeeCode?: string | number | undefined;
};

export const getProfile = async ({id}: profileParams) => {
  return await api.get(`/profile/${id}`);
};

export const getProfileByIds = async ({docNum, employeeCode}: profileParams) => {
  return await api.get(`/profile?docNum=${docNum}&employeeCode=${employeeCode}`);
};

export const getProfileImg = async ({id}: profileParams) => {  
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