import { create } from "zustand";

interface Store {
  preferences: string[];
  setPreferences: (preferences: string[]) => void;
}

// Create the store
const usePreferenceStore = create<Store>((set) => ({
  preferences: [],

  setPreferences: (preferences) =>
    set(() => ({
      preferences,
    })),
}));

export default usePreferenceStore;
