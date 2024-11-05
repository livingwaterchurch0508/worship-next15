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
    set({ playList, enablePlaySet: new Set(enablePlaySet), isPlaying: false });
    localStorage.setItem("playList", JSON.stringify(playList));
  },
  addPlayList: (playItem) => {
    let isDuplicate = false;

    set((state) => {
      const playList = state.playList;

      isDuplicate = playList.some(
        (item: IHymn) => item.title === playItem.title,
      );
      if (!isDuplicate) {
        const lastIndex =
          state.playList.length === 0
            ? 1
            : Math.max(...playList.map((item) => item.index)) + 1;
        const updatedPlayList = [
          ...playList,
          { ...playItem, index: lastIndex, id: lastIndex },
        ];
        const enablePlayList: number[] = [];
        updatedPlayList.forEach(({ song, index }) => {
          if (!!song) {
            enablePlayList.push(index);
            if (state.playIndex === null) {
              state.playIndex = index;
            }
          }
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
