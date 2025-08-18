import { create } from 'zustand';
import type { Profile } from '../types/auth/Register';
import { getProfile, getProfileImg } from '../service/profileService';

type ProfileState = {
  profile: Profile | null;
  getProfile: (id: string | number | undefined) => void;
  getProfileImg: (id: string | number | undefined) => Promise<string>;
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  getProfile: async (id) => {
    try {
      const {data} = await getProfile(id);
      set({ profile: data.response });
      return Promise.resolve(data.response);
    } catch (error) {
      console.error('Error fetching profile:', error);
      set({ profile: null });
      throw error;
    }
  },
  getProfileImg: async (id: string | number | undefined) => {
    try {
      const {data: blob} = await getProfileImg(id);
      const url = URL.createObjectURL(blob);
      return Promise.resolve(url);
    } catch (error) {
      console.error('Error fetching profile image:', error);
      throw error;
    }
  }
}));