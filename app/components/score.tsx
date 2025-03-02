"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";

import { AspectRatio } from "@/app/components/ui/aspect-ratio";

import { usePlayListStore } from "@/app/stores/play-list-store";
import { useScoreItemStore } from "@/app/stores/score-item-store";
import { IHymn } from "@/app/variables/interfaces";
import { SCORE_MODE } from "@/app/variables/enums";

export default function Score() {
  const { playIndex, setPlayIndex, playList, enablePlaySet, setIsPlaying } =
    usePlayListStore((state) => state);
  const { scoreIndex, setScoreIndex, scoreMode } = useScoreItemStore(
    (state) => state,
  );

  const [currentPlayItem, setCurrentPlayItem] = useState<IHymn | null>(null);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (playIndex === null || scoreIndex === null) {
      const enableFirstPlayItem =
        enablePlaySet.size > 0
          ? enablePlaySet.values().next().value
          : undefined;

      if (enableFirstPlayItem === undefined) {
        if (playList.length > 0) {
          setScoreIndex(playList[0].index);
          return;
        }
        setScoreIndex(null);
        setCurrentPlayItem(null);
        return;
      }

      if (playList.length > 0) {
        const findIndex = playList.findIndex(
          ({ index }) => index === enableFirstPlayItem,
        );
        if (findIndex === -1) {
          setScoreIndex(playList[0].index);
        }

        if (findIndex > -1) {
          setScoreIndex(playList[findIndex].index);
          setPlayIndex(playList[findIndex].index);
        }
        if (isFirst) {
          setIsFirst(true);
          return;
        }
        setIsPlaying(true);
      }
      return;
    }

    const findIndex = playList.findIndex(({ index }) => index === scoreIndex);

    if (findIndex === -1) {
      setCurrentPlayItem(null);
      return;
    }

    if (scoreMode === SCORE_MODE.A) {
      const findPlayIndex = playList.findIndex(
        ({ index }) => index === playIndex,
      );
      setScoreIndex(playList[findPlayIndex].index);
    }

    setCurrentPlayItem(playList[findIndex]);
  }, [playIndex, playList, scoreIndex, enablePlaySet, scoreMode]);

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
        <PhotoProvider key={currentPlayItem?.isMulti || 1}>
          {Array.from({ length: currentPlayItem?.isMulti || 1 }).map((_, i) => (
            <AspectRatio ratio={1 / 1.414} className="bg-muted" key={i}>
              <PhotoView src={setScorePath(currentPlayItem, i)}>
                <Image
                  src={setScorePath(currentPlayItem, i)}
                  alt={`Image ${i}`}
                  className="w-full rounded-md"
                  fill
                />
              </PhotoView>
            </AspectRatio>
          ))}
        </PhotoProvider>
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
