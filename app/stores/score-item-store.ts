import { create } from "zustand";
import { SCORE_MODE, TScoreMode } from "@/app/variables/enums";

interface IScoreItemStore {
  scoreIndex: number | null;
  setScoreIndex: (scoreIndex: number | null) => void;
  scoreMode: TScoreMode;
  setScoreMode: (scoreMode: TScoreMode) => void;
}

const useScoreItemStore = create<IScoreItemStore>((set) => ({
  scoreIndex: null,
  setScoreIndex: (scoreIndex) => set({ scoreIndex }),
  scoreMode: SCORE_MODE.M,
  setScoreMode: (scoreMode) => set({ scoreMode }),
}));

export { useScoreItemStore };
