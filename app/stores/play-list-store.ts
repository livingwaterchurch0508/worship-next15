import { create } from "zustand";

import { IHymn, IPlayHymn } from "@/app/variables/interfaces";

interface IPlayListStore {
  playList: IPlayHymn[];
  setPlayList: (playList: IPlayHymn[]) => void;
  addPlayList: (playItem: IHymn) => boolean;
  removePlayList: (playItem: IHymn) => void;
  playIndex: number | null;
  setPlayIndex: (playIndex: number | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  enablePlaySet: Set<number>;
}

const usePlayListStore = create<IPlayListStore>((set) => ({
  playList: [],
  playIndex: null,
  isPlaying: false,
  enablePlaySet: new Set<number>(),
  setPlayList: (playList) => {
    const enablePlaySet: number[] = [];
    playList.forEach(({ song, index }) => {
      if (!!song) enablePlaySet.push(index);
    });
    set({ playList, enablePlaySet: new Set(enablePlaySet) });
  },
  addPlayList: (playItem) => {
    let isDuplicate = false;

    set((state) => {
      isDuplicate = state.playList.some(
        (item: IHymn) => item.title === playItem.title,
      );
      if (!isDuplicate) {
        const lastIndex =
          state.playList.length === 0
            ? 1
            : state.playList[state.playList.length - 1].index + 1;
        const updatedPlayList = [
          ...state.playList,
          { ...playItem, index: lastIndex },
        ];
        const enablePlayList: number[] = [];
        updatedPlayList.forEach(({ song, index }) => {
          if (!!song) enablePlayList.push(index);
        });

        localStorage.setItem("playList", JSON.stringify(updatedPlayList));

        return {
          playList: updatedPlayList,
          enablePlaySet: new Set(enablePlayList),
        };
      }
      return state;
    });

    return !isDuplicate;
  },
  removePlayList: (playItem) =>
    set((state) => {
      const updatedPlayList = state.playList.filter(
        (item: IHymn) => item.title !== playItem.title,
      );
      const enablePlayList: number[] = [];
      updatedPlayList.forEach(({ song, index }) => {
        if (!!song) enablePlayList.push(index);
      });

      localStorage.setItem("playList", JSON.stringify(updatedPlayList));
      return {
        playList: updatedPlayList,
        enablePlaySet: new Set(enablePlayList),
      };
    }),
  setPlayIndex: (playIndex) => set({ playIndex }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
}));

export { usePlayListStore };
