"use client";

import { useState } from "react";

import PlayList from "@/app/components/player/play-list";
import AudioPlayer from "@/app/components/player/audio-player";

export default function Player() {
  const [showPlayList, setShowPlayList] = useState(false);

  return (
    <div className="w-full absolute bottom-0">
      <PlayList
        showPlayList={showPlayList}
        setShowPlayListAction={setShowPlayList}
      />
      <AudioPlayer setShowPlayListAction={setShowPlayList} />
    </div>
  );
}
