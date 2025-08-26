import { create } from 'zustand';
import type { Profile } from '../types/auth/Register';
import { getProfile, getProfileByIds, getProfileImg } from '../service/profileService';

type profileParams = {
  id?: string | number | undefined;
  docNum?: string | number | undefined;
  employeeCode?: string | number | undefined;
};

type ProfileState = {
  profile: Profile | null;
  getProfile: (id: profileParams) => void;
  getProfileByUserIds: (id: profileParams) => Promise<string>;
  getProfileImg: (id: profileParams) => Promise<string>;
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  getProfile: async ({id}: profileParams) => {
    try {
      const {data} = await getProfile({id});
      sessionStorage.setItem('nit-code', data?.response?.nitCode);
      set({ profile: data.response });
      return Promise.resolve(data.response);
    } catch (error) {
      console.error('Error fetching profile:', error);
      set({ profile: null });
      throw error;
    }
  },
  getProfileByUserIds: async ({docNum, employeeCode}: profileParams) => {
    try {
      const {data} = await getProfileByIds({docNum, employeeCode});
      return Promise.resolve(data.response);
    } catch (error) {
      console.error('Error fetching profile filtered:', error);
      set({ profile: null });
      throw error;
    }
  },
  getProfileImg: async ({id}: profileParams) => {
    try {
      const {data: blob} = await getProfileImg({id});
      const url = URL.createObjectURL(blob);
      return Promise.resolve(url);
    } catch (error) {
      console.error('Error fetching profile image:', error);
      throw error;
    }
  }
}));