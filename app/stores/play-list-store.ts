import { create } from "zustand";

import { IHymn, IPlayHymn } from "@/app/variables/interfaces";
import { PLAY_MODE, TPlayMode } from "@/app/variables/enums";
import { useScoreItemStore } from "@/app/stores/score-item-store";

interface IPlayListStore {
  playList: IPlayHymn[];
  setPlayList: (tabNo: string, playList: IPlayHymn[]) => void;
  addPlayList: (tabNo: string, playItem: IHymn) => boolean;
  removePlayList: (tabNo: string, playItem: IHymn) => void;
  playIndex: number | null;
  setPlayIndex: (playIndex: number | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  enablePlaySet: Set<number>;
  playMode: TPlayMode;
  setPlayMode: (playMode: TPlayMode) => void;
  tabNo: string;
  setTabNo: (tabNo: string) => void;
}

const usePlayListStore = create<IPlayListStore>((set) => ({
  playList: [],
  playIndex: null,
  isPlaying: false,
  playMode: PLAY_MODE.B,
  enablePlaySet: new Set<number>(),
  setPlayList: (tabNo, playList) => {
    const enablePlaySet: number[] = [];
    playList.forEach(({ song, index }) => {
      if (!!song) enablePlaySet.push(index);
    });
    set({
      playList,
      enablePlaySet: new Set(enablePlaySet),
      playIndex: enablePlaySet?.[0] ?? null,
    });
    localStorage.setItem("tabNo", `${tabNo}`);
    localStorage.setItem(`${tabNo}_playList`, JSON.stringify(playList));
  },
  addPlayList: (tabNo, playItem) => {
    let isDuplicate = false;

    const { setScoreIndex } = useScoreItemStore.getState();

    set((state) => {
      const playList = state.playList;

      const findIndex = playList.findIndex(
        (item: IHymn) => item.title === playItem.title,
      );
      isDuplicate = findIndex >= 0;
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

        localStorage.setItem(
          `${tabNo}_playList`,
          JSON.stringify(updatedPlayList),
        );

        setScoreIndex(lastIndex);

        return {
          playList: updatedPlayList,
          enablePlaySet: new Set(enablePlayList),
        };
      }
      setScoreIndex(playList[findIndex].index);
      return state;
    });

    return !isDuplicate;
  },
  removePlayList: (tabNo, playItem) =>
    set((state) => {
      const updatedPlayList = state.playList.filter(
        (item: IHymn) => item.title !== playItem.title,
      );
      const enablePlayList: number[] = [];
      updatedPlayList.forEach(({ song, index }) => {
        if (!!song) enablePlayList.push(index);
      });

      localStorage.setItem(
        `${tabNo}_playList`,
        JSON.stringify(updatedPlayList),
      );
      return {
        playList: updatedPlayList,
        enablePlaySet: new Set(enablePlayList),
      };
    }),
  setPlayIndex: (playIndex) => set({ playIndex }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setPlayMode: (playMode) => set({ playMode }),
  tabNo: "1",
  setTabNo: (tabNo) => {
    localStorage.setItem("tabNo", `${tabNo}`);
    set({ tabNo });
  },
}));

export { usePlayListStore };
