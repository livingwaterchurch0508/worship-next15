"use client";

import { useEffect, useState } from "react";

import PlayList from "@/app/components/player/play-list";
import AudioPlayer from "@/app/components/player/audio-player";
import { IPlayHymn } from "@/app/variables/interfaces";
import { usePlayListStore } from "@/app/stores/play-list-store";

export default function Player() {
  const [showPlayList, setShowPlayList] = useState(false);
  const { setPlayList } = usePlayListStore((state) => state);

  useEffect(() => {
    const storedPlayList: IPlayHymn[] = JSON.parse(
      localStorage.getItem("playList") || "[]",
    );
    setPlayList(storedPlayList);
  }, []);

  return (
    <div className="w-full absolute bottom-0">
      <PlayList
        showPlayList={showPlayList}
        setShowPlayListAction={setShowPlayList}
      />
      <AudioPlayer
        showPlayList={showPlayList}
        setShowPlayListAction={setShowPlayList}
      />
    </div>
  );
}
