"use client";

import { useEffect } from "react";
import { usePlayListStore } from "@/app/stores/play-list-store";
import { MENU_TITLES } from "@/app/variables/enums";

export default function UpdateMetadata() {
  const { playList, playIndex } = usePlayListStore((state) => state);

  useEffect(() => {
    if (playList.length > 0 && playIndex !== null) {
      const worship =
        playList[playList.findIndex(({ index }) => index === playIndex)];
      if (worship) {
        document.title = `${MENU_TITLES[worship.type]?.substring(0, 1)} ${worship.title} - 생수가 흐르는 교회💒 찬양집`;
      }
    }
  }, [playList, playIndex]);

  return null;
}
