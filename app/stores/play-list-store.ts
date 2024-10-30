import { create } from "zustand";

import { IHymn } from "@/app/variables/interfaces";

interface IPlayListStore {
  playList: IHymn[];
  addPlayList: (playItem: IHymn) => void;
  removePlayList: (playItem: IHymn) => void;
  playIndex: number | null;
  setPlayIndex: (playIndex: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  enablePlaySet: Set<number>;
}

const usePlayListStore = create<IPlayListStore>((set) => ({
  playList: [],
  playIndex: null,
  isPlaying: false,
  enablePlaySet: new Set<number>(),
  addPlayList: (playItem) =>
    set((state) => {
      const isDuplicate = state.playList.some(
        (item: IHymn) => item.title === playItem.title,
      );
      if (!isDuplicate) {
        const updatedPlayList = [...state.playList, playItem];
        const enablePlayList: number[] = [];
        updatedPlayList.forEach(({ song }, index) => {
          if (!!song) enablePlayList.push(index);
        });

        return {
          playList: updatedPlayList,
          enablePlaySet: new Set(enablePlayList),
        };
      }
      return state;
    }),
  removePlayList: (playItem) =>
    set((state) => {
      const updatedPlayList = state.playList.filter(
        (item: IHymn) => item.title !== playItem.title,
      );
      const enablePlayList: number[] = [];
      updatedPlayList.forEach(({ song }, index) => {
        if (!!song) enablePlayList.push(index);
      });

      return {
        playList: updatedPlayList,
        enablePlaySet: new Set(enablePlayList),
      };
    }),
  setPlayIndex: (playIndex) => set({ playIndex }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));

export { usePlayListStore };
