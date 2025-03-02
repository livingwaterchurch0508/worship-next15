"use client";

import { useEffect, useState } from "react";

import PlayList from "@/app/components/player/play-list";
import AudioPlayer from "@/app/components/player/audio-player";

import { usePlayer } from "@/app/hooks/use-player";
import { usePlayListStore } from "@/app/stores/play-list-store";
import { IPlayHymn } from "@/app/variables/interfaces";

export default function Player() {
  const [showPlayList, setShowPlayList] = useState(false);
  const { setPlayList, setTabNo, tabNo } = usePlayListStore((state) => state);

  const player = usePlayer();

  useEffect(() => {
    const storageTabNo = localStorage.getItem("tabNo") ?? tabNo;
    setTabNo(storageTabNo);
  }, []);

  useEffect(() => {
    let storedPlayList: IPlayHymn[] = JSON.parse(
      localStorage.getItem(`${tabNo}_playList`) || "[]",
    );
    if (storedPlayList.length === 0 && tabNo === "1") {
      storedPlayList = JSON.parse(localStorage.getItem(`playList`) || "[]");
    }

    setPlayList(
      tabNo,
      storedPlayList.map((item) => ({ ...item, id: item.index })),
    );
  }, [tabNo]);

  return (
    <div className="w-full absolute bottom-0">
      <PlayList
        showPlayList={showPlayList}
        setShowPlayListAction={setShowPlayList}
        {...player}
      />
      <AudioPlayer
        showPlayList={showPlayList}
        setShowPlayListAction={setShowPlayList}
        {...player}
      />
    </div>
  );
}
