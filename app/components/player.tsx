"use client";

import { useEffect, useState } from "react";

import PlayList from "@/app/components/player/play-list";
import AudioPlayer from "@/app/components/player/audio-player";

import { usePlayer } from "@/app/hooks/use-player";
import { usePlayListStore } from "@/app/stores/play-list-store";
import { IPlayHymn } from "@/app/variables/interfaces";

export default function Player() {
  const [showPlayList, setShowPlayList] = useState(false);
  const { setPlayList } = usePlayListStore((state) => state);

  const player = usePlayer();

  useEffect(() => {
    const storedPlayList: IPlayHymn[] = JSON.parse(
      localStorage.getItem("playList") || "[]",
    );
    setPlayList(storedPlayList.map((item) => ({ ...item, id: item.index })));
  }, []);

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
