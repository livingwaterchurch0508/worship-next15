import { create } from "zustand";

interface IScoreItemStore {
  scoreIndex: number | null;
  setScoreIndex: (scoreIndex: number) => void;
}

const useScoreItemStore = create<IScoreItemStore>((set) => ({
  scoreIndex: null,
  setScoreIndex: (scoreIndex) => set({ scoreIndex }),
}));

export { useScoreItemStore };
