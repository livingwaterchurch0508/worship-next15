"use client";

import { useSortable } from "@dnd-kit/sortable";
import { BookOpen, GripVertical, Pause, Play, X } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { Label } from "@/app/components/ui/label";

import { useScoreItemStore } from "@/app/stores/score-item-store";
import { usePlayListStore } from "@/app/stores/play-list-store";
import { SCORE_MODE } from "@/app/variables/enums";
import { IPlayHymn } from "@/app/variables/interfaces";

interface IPlayItem {
  worship: IPlayHymn;
}

export default function PlayItem({ worship }: IPlayItem) {
  const { playIndex, isPlaying, removePlayList, setPlayIndex, setIsPlaying } =
    usePlayListStore((state) => state);
  const { scoreIndex, setScoreIndex, setScoreMode } = useScoreItemStore(
    (state) => state,
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: worship.index });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  const setScore = () => {
    setScoreMode(SCORE_MODE.M);
    setScoreIndex(worship.index);
  };

  return (
    <div ref={setNodeRef} className="w-full" style={style} {...attributes}>
      <div className="flex w-full">
        <div className="pl-2 pr-2">
          <Button variant="ghost" size="icon" {...listeners}>
            <GripVertical />
          </Button>
        </div>
        <div className={`flex items-center overflow-hidden w-full`}>
          <Label
            className={`whitespace-nowrap animate-marquee ${
              playIndex === worship.index
                ? "text-blue-700 dark:text-blue-300"
                : ""
            }`}
          >
            {worship.title}
          </Label>
        </div>
        <div className="min-w-[120px] flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={setScore}>
            <BookOpen
              className={
                scoreIndex === worship.index
                  ? "text-blue-700 dark:text-blue-300"
                  : ""
              }
            />
          </Button>
          {!!worship.song && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (playIndex === worship.index) {
                  setIsPlaying(!isPlaying);
                  return;
                }
                setPlayIndex(worship.index);
                setIsPlaying(true);
              }}
            >
              {playIndex === worship.index && isPlaying ? (
                <Pause
                  className={
                    playIndex === worship.index
                      ? "text-blue-700 dark:text-blue-300"
                      : ""
                  }
                />
              ) : (
                <Play
                  className={
                    playIndex === worship.index
                      ? "text-blue-700 dark:text-blue-300"
                      : ""
                  }
                />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              removePlayList(worship);
              if (playIndex === worship.index) {
                setPlayIndex(null);
                setIsPlaying(false);
              }
              if (scoreIndex === worship.index) {
                setScoreIndex(null);
              }
            }}
          >
            <X />
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
    </div>
  );
}
