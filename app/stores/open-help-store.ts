import { create } from "zustand";

interface IOpenHelpStore {
  openHelp: boolean;
  setOpenHelp: (openHelp: boolean) => void;
}

const useOpenHelpStore = create<IOpenHelpStore>((set) => ({
  openHelp: false,
  setOpenHelp: (openHelp) => set({ openHelp }),
}));

export { useOpenHelpStore };
