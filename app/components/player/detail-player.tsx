import Image from "next/image";
import {
  BookOpen,
  LucideRecycle,
  Pause,
  Play,
  Repeat,
  Repeat1,
  StepBack,
  StepForward,
} from "lucide-react";

import { Label } from "@/app/components/ui/label";
import { Progress } from "@/app/components/ui/progress";
import { Button } from "@/app/components/ui/button";

import { usePlayListStore } from "@/app/stores/play-list-store";
import { useScoreItemStore } from "@/app/stores/score-item-store";
import { PLAY_MODE, SCORE_MODE } from "@/app/variables/enums";
import { IDetailPlayer } from "@/app/variables/interfaces";
import { formatTime } from "@/app/lib/date-util";

export default function DetailPlayer({
  handleScore,
  handleNextPlay,
  handlePrevPlay,
  handlePlay,
  handlePause,
  progressBarRef,
  progress,
  audioRef,
  handleMouseDown,
  handlePlayMode,
}: IDetailPlayer) {
  const { playList, playIndex, isPlaying, playMode } = usePlayListStore(
    (state) => state,
  );
  const { scoreIndex, scoreMode } = useScoreItemStore((state) => state);

  return playIndex ? (
    <div className="pl-2 pr-2 pb-2 w-full flex flex-col">
      <div className="flex w-full mb-2 gap-2 items-center">
        <Image
          src="/carousel/cross.jpg"
          alt="audio image"
          width={44}
          height={44}
          style={{ height: "44px" }}
          className="rounded-md"
        />
        <div className="flex flex-col truncate">
          <Label className="text-lg truncate overflow-ellipsis">
            {
              playList[playList.findIndex(({ index }) => index === playIndex)]
                .title
            }
          </Label>
          <Label className="text-muted-foreground truncate overflow-ellipsis">
            김이진 목사님
          </Label>
        </div>
      </div>
      <div
        ref={progressBarRef}
        onMouseDown={handleMouseDown}
        className="cursor-pointer"
      >
        <Progress value={progress} />
      </div>
      <div className="flex w-full justify-between mt-2">
        <Label>{formatTime(audioRef.current?.currentTime || 0)}</Label>
        <Label>{formatTime(audioRef.current?.duration || 0)}</Label>
      </div>
      <div className="flex w-full p-2 gap-2 justify-between overflow-x-auto">
        <div className="relative">
          <Button variant="ghost" size="icon" onClick={handleScore}>
            <BookOpen
              style={{ width: "18px", height: "18px" }}
              className={
                scoreIndex !== null && scoreIndex === playIndex
                  ? "text-blue-700 dark:text-blue-300"
                  : ""
              }
            />
            {scoreMode === SCORE_MODE.A ? (
              <LucideRecycle
                className={
                  scoreIndex !== null && scoreIndex === playIndex
                    ? "text-blue-700 dark:text-blue-300 w-[12px] absolute right-0 top-0"
                    : "w-[12px] absolute right-0 top-0"
                }
              />
            ) : null}
          </Button>
        </div>
        <Button variant="ghost" size="icon" onClick={handlePrevPlay}>
          <StepBack style={{ width: "18px", height: "18px" }} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={isPlaying ? handlePause : handlePlay}
        >
          {isPlaying ? (
            <Pause
              style={{ width: "18px", height: "18px" }}
              className={"text-blue-700 dark:text-blue-300"}
            />
          ) : (
            <Play
              style={{ width: "18px", height: "18px" }}
              className={"text-blue-700 dark:text-blue-300"}
            />
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => handleNextPlay()}>
          <StepForward style={{ width: "18px", height: "18px" }} />
        </Button>
        <Button variant="ghost" size="icon" onClick={handlePlayMode}>
          {playMode === PLAY_MODE.B ? (
            <Repeat
              style={{ width: "18px", height: "18px" }}
              className="text-blue-700 dark:text-blue-300"
            />
          ) : (
            <Repeat1
              style={{ width: "18px", height: "18px" }}
              className="text-blue-700 dark:text-blue-300"
            />
          )}
        </Button>
      </div>
    </div>
  ) : null;
}
