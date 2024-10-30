import { create } from "zustand";

interface IFullScreenStore {
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}

const useIsFullScreenStore = create<IFullScreenStore>((set) => ({
  isFullScreen: false,
  isAnimating: false,
  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
  setIsAnimating: (isAnimating) => set({ isAnimating }),
}));

export { useIsFullScreenStore };
