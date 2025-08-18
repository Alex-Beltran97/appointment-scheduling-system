import { create } from 'zustand';
import { search } from '../service/searchService';

interface SearchStore {
  setSearchQuery: (query: string) => void;
}; 

export const useSearchStore = create<SearchStore>(() =>({
  setSearchQuery: async (query: string) => {
    try {
      if (!query.trim()) return;
      const {data} = await search(query);
      return data;
    } catch (error) {
      console.error('Error setting search query:', error);
      throw new Error('Failed to set search query');
    }
  },
}));