"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { AspectRatio } from "@/app/components/ui/aspect-ratio";

import { usePlayListStore } from "@/app/stores/play-list-store";
import { useScoreItemStore } from "@/app/stores/score-item-store";
import { IHymn } from "@/app/variables/interfaces";

export default function Score() {
  const { playIndex, playList, enablePlaySet } = usePlayListStore(
    (state) => state,
  );
  const { scoreIndex, setScoreIndex } = useScoreItemStore((state) => state);

  const [currentPlayItem, setCurrentPlayItem] = useState<IHymn | null>(null);

  useEffect(() => {
    if (playIndex === null && scoreIndex === null) {
      const enableFirstPlayItem =
        enablePlaySet.size > 0
          ? enablePlaySet.values().next().value
          : undefined;

      if (enableFirstPlayItem === undefined) {
        if (playList.length > 0) setScoreIndex(1);
        return;
      }
      return;
    }

    if (scoreIndex === null) return;
    const findIndex = playList.findIndex(({ index }) => index === scoreIndex);

    if (findIndex === -1) {
      setCurrentPlayItem(null);
      return;
    }

    setCurrentPlayItem(playList[findIndex]);
  }, [playIndex, playList, scoreIndex, enablePlaySet]);

  const setScorePath = (item: IHymn, index: number) => {
    if (!item) return "";

    if (index === 0) {
      return `/${item.type}/${item.src}`;
    }
    return `/${item.type}/${item.src.replace(".jpg", `-${index}.jpg`)}`;
  };

  return (
    <div
      className="w-full overflow-auto"
      style={{ height: "calc(100dvh - 170px)" }}
    >
      {currentPlayItem !== null && currentPlayItem ? (
        Array.from({ length: currentPlayItem?.isMulti || 1 }).map((_, i) => (
          <AspectRatio ratio={1 / 1.414} className="bg-muted" key={i}>
            <Image
              src={setScorePath(currentPlayItem, i)}
              alt="Image"
              className="w-full rounded-md"
              fill
            />
          </AspectRatio>
        ))
      ) : (
        <AspectRatio ratio={1 / 1.414} className="bg-muted">
          <Image
            src="/carousel/2.jpg"
            alt="Image"
            className="w-full rounded-md"
            fill
          />
        </AspectRatio>
      )}
    </div>
  );
}
