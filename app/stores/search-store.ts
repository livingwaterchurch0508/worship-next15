import { create } from "zustand";

interface ISearchStore {
  search: string;
  setSearch: (search: string) => void;
}

const useSearchStore = create<ISearchStore>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));

export { useSearchStore };
