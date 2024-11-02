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
  const { scoreIndex, setScoreIndex } = useScoreItemStore((state) => state);
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
                  <span
                    className={
                      playIndex === worship.index
                        ? "text-blue-700 dark:text-blue-300 truncate"
                        : "truncate"
                    }
                  >
                    {worship.title}
                  </span>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setScoreIndex(worship.index)}
                    >
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
                      }}
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
