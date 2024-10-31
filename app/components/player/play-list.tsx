"use client";

import { useCallback, useEffect, useState } from "react";
import { BookOpen, ChevronDown, Pause, Play, X } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";

import { usePlayListStore } from "@/app/stores/play-list-store";
import { useScoreItemStore } from "@/app/stores/score-item-store";
import { IPlayList } from "@/app/variables/interfaces";

export default function PlayList({
  showPlayList,
  setShowPlayListAction,
}: IPlayList) {
  const {
    playList,
    playIndex,
    isPlaying,
    removePlayList,
    setPlayIndex,
    setIsPlaying,
  } = usePlayListStore((state) => state);
  const { setScoreIndex } = useScoreItemStore((state) => state);
  const [isVisible, setIsVisible] = useState(showPlayList);

  useEffect(() => {
    if (showPlayList) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // 애니메이션 시간과 맞춤
      return () => clearTimeout(timer);
    }
  }, [showPlayList]);

  const closePlayList = useCallback(() => {
    setShowPlayListAction(false);
  }, [setShowPlayListAction]);

  return isVisible ? (
    <Card
      className={`transition-transform duration-300 ${showPlayList ? "animate-slide-up" : "animate-slide-down"}`}
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>재생 목록</CardTitle>
          <Button variant="ghost" size="icon" onClick={closePlayList}>
            <ChevronDown />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full rounded-md border p-4">
          <div className="p4">
            {playList.map((worship, index) => (
              <div key={index} className="w-full">
                <div className="flex justify-between">
                  <span>{worship.title}</span>
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setScoreIndex(index)}
                    >
                      <BookOpen />
                    </Button>
                    {!!worship.song && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setPlayIndex(index);
                          setIsPlaying(!isPlaying);
                        }}
                      >
                        {playIndex === index && isPlaying ? (
                          <Pause />
                        ) : (
                          <Play />
                        )}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePlayList(worship)}
                    >
                      <X />
                    </Button>
                  </div>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  ) : null;
}
