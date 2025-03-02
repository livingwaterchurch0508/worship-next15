import { useCallback } from "react";
import {
  BookOpen,
  LucideRecycle,
  Pause,
  Play,
  Rows4,
  StepBack,
  StepForward,
} from "lucide-react";

import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { Label } from "@/app/components/ui/label";

import { usePlayListStore } from "@/app/stores/play-list-store";
import { useScoreItemStore } from "@/app/stores/score-item-store";
import { SCORE_MODE } from "@/app/variables/enums";
import { IPlayList } from "@/app/variables/interfaces";

export default function AudioPlayer({
  showPlayList,
  setShowPlayListAction,
  audioRef,
  handleScore,
  handlePrevPlay,
  handlePlay,
  handlePause,
  handleNextPlay,
  progress,
  progressBarRef,
}: IPlayList) {
  const { playList, playIndex, isPlaying } = usePlayListStore((state) => state);
  const { scoreIndex, scoreMode } = useScoreItemStore((state) => state);

  const handleShowPlayList = useCallback(() => {
    setShowPlayListAction((prev) => !prev);
  }, [setShowPlayListAction]);

  return (
    <Card>
      <audio ref={audioRef} className="hidden" controls />
      <div className="flex w-full">
        <div className="pl-2 pr-2">
          <Button variant="ghost" size="icon" onClick={handleShowPlayList}>
            <Rows4
              className={showPlayList ? "text-blue-700 dark:text-blue-300" : ""}
            />
          </Button>
        </div>
        <div className="flex items-center overflow-hidden w-full">
          <Label className="whitespace-nowrap animate-marquee">
            {playIndex === null ||
            playList.findIndex(({ index }) => index === playIndex) === -1
              ? "선택된 찬양이 없습니다."
              : playList[playList.findIndex(({ index }) => index === playIndex)]
                  .title}
          </Label>
        </div>
        <div className="min-w-[160px] flex items-center space-x-2">
          <div className="relative">
            <Button variant="ghost" size="icon" onClick={handleScore}>
              <BookOpen
                className={
                  scoreIndex !== null && scoreIndex === playIndex
                    ? "text-blue-700 dark:text-blue-300"
                    : ""
                }
              />
            </Button>
            {scoreMode === SCORE_MODE.A ? (
              <LucideRecycle
                className={
                  scoreIndex !== null && scoreIndex === playIndex
                    ? "text-blue-700 dark:text-blue-300 w-[12px] absolute right-1 top-0"
                    : "w-[12px] absolute right-1 top-0"
                }
              />
            ) : null}
          </div>
          <Button variant="ghost" size="icon" onClick={handlePrevPlay}>
            <StepBack />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={isPlaying ? handlePause : handlePlay}
          >
            {isPlaying ? (
              <Pause
                className={
                  playIndex === null ? "" : "text-blue-700 dark:text-blue-300"
                }
              />
            ) : (
              <Play
                className={
                  playIndex === null || !isPlaying
                    ? ""
                    : "text-blue-700 dark:text-blue-300"
                }
              />
            )}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleNextPlay()}>
            <StepForward />
          </Button>
        </div>
      </div>
      <div ref={progressBarRef}>
        <Progress value={progress} />
      </div>
    </Card>
  );
}
