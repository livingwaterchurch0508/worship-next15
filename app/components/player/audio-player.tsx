"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BookOpen,
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
import { MENU_TITLES } from "@/app/variables/enums";
import { IPlayList } from "@/app/variables/interfaces";

export default function AudioPlayer({
  showPlayList,
  setShowPlayListAction,
}: IPlayList) {
  const {
    playList,
    playIndex,
    setPlayIndex,
    isPlaying,
    setIsPlaying,
    enablePlaySet,
  } = usePlayListStore((state) => state);
  const { scoreIndex, setScoreIndex } = useScoreItemStore((state) => state);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleShowPlayList = useCallback(() => {
    setShowPlayListAction((prev) => !prev);
  }, [setShowPlayListAction]);

  /** 이전 곡 재생하기 */
  const handlePrevPlay = () => {
    if (playIndex === null) return;

    // enablePlaySet을 배열로 변환하여 인덱스 찾기
    const enablePlayArray = Array.from(enablePlaySet);
    const currentIndex = enablePlayArray.indexOf(playIndex);

    if (enablePlayArray.length === 1) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current?.play();
        audioRef.current.play();
        setIsPlaying(true);
        return;
      }
    }

    // 현재 인덱스가 enablePlaySet에 있는 경우 이전 값 가져오기
    if (currentIndex > 0) {
      setPlayIndex(enablePlayArray[currentIndex - 1]);
    } else {
      // 첫 번째 값이면 마지막 값으로 순환
      setPlayIndex(enablePlayArray[enablePlayArray.length - 1]);
    }
  };

  /** 재생하기 / 멈추기 */
  const handlePlay = () => {
    if (playIndex === null) return;

    audioRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (playIndex === null) return;

    audioRef.current?.pause();
    setIsPlaying(false);
  };

  /** 다음 곡 재생하기 */
  const handleNextPlay = () => {
    if (playIndex === null) return;

    // enablePlaySet을 배열로 변환하여 인덱스 찾기
    const enablePlayArray = Array.from(enablePlaySet);
    const currentIndex = enablePlayArray.indexOf(playIndex);

    if (enablePlayArray.length === 1) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current?.play();
        setIsPlaying(true);
        return;
      }
    }

    // 현재 인덱스가 enablePlaySet에 있는 경우 다음 값 가져오기
    if (currentIndex !== -1 && currentIndex < enablePlayArray.length - 1) {
      // 다음 값이 있으면 설정
      setPlayIndex(enablePlayArray[currentIndex + 1]);
    } else {
      // 마지막 값이면 첫 번째 값으로 순환
      setPlayIndex(enablePlayArray[0]);
    }
  };

  /** 재생 시간 업데이트하기 */
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;

    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  /** 재생시간 프로그래스 업데이트 하기 */
  const updateProgress = (clientX: number) => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    if (!audio || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickPositionX = clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(clickPositionX / rect.width, 1));

    audio.currentTime = audio.duration * clickRatio;
    setProgress(clickRatio * 100);
  };

  /** 재생시간 프로그래스 바 선택 */
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateProgress(event.clientX);
  };

  /** 재생시간 프로그래스 바 이동 */
  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    const clientX =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    if (isDragging) {
      updateProgress(clientX);
    }
  };

  /** 재생시간 프로그래스 바 떼기 */
  const handleMouseUp = () => {
    setIsDragging(false);
    if (!isPlaying && playIndex !== null) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  /** 재생 종료시 */
  const handleAudioEnded = () => {
    handleNextPlay();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleAudioEnded);
    }
    return () => {
      audio?.removeEventListener("timeupdate", handleTimeUpdate);
      audio?.removeEventListener("ended", handleAudioEnded);
    };
  }, [playIndex, enablePlaySet]);

  const audioPlay = (findIndex: number) => {
    const worship = playList[findIndex];
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: worship.title,
        artist: "김이진 목사님",
        album: MENU_TITLES[worship.type],
        artwork: [
          { src: "/carousel/cross.jpg", sizes: "160x160", type: "image/jpeg" },
        ],
      });

      navigator.mediaSession.setActionHandler("play", handlePlay);
      navigator.mediaSession.setActionHandler("pause", handlePause);
      navigator.mediaSession.setActionHandler("nexttrack", handleNextPlay);
      navigator.mediaSession.setActionHandler("previoustrack", handleNextPlay);
      audioRef.current?.play();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (playIndex === null) {
        audio.pause();
      }
      if (playIndex !== null) {
        const findIndex = playList.findIndex(
          ({ index }) => index === playIndex,
        );

        if (findIndex === -1) return;

        if (audio.src) {
          const audioSrcPath = decodeURIComponent(
            new URL(audio.src).pathname.split("/").pop() || "",
          );
          if (playList[findIndex].song === audioSrcPath) {
            if (isPlaying) {
              audioPlay(findIndex);
              return;
            }
            audio.pause();
            return;
          }
        }
        audio.pause();
        audio.src = playList[findIndex].song
          ? `/songs/${playList[findIndex].song}`
          : "";

        if (isPlaying) {
          audioPlay(findIndex);
        }
      }
    }
  }, [playIndex, isPlaying, enablePlaySet]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Card>
      <audio ref={audioRef} className="hidden" />
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
        <div className="min-w-[160px]">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => playIndex !== null && setScoreIndex(playIndex)}
          >
            <BookOpen
              className={
                scoreIndex !== null && scoreIndex === playIndex
                  ? "text-blue-700 dark:text-blue-300"
                  : ""
              }
            />
          </Button>
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
          <Button variant="ghost" size="icon" onClick={handleNextPlay}>
            <StepForward />
          </Button>
        </div>
      </div>
      <div
        ref={progressBarRef}
        onMouseDown={handleMouseDown}
        className="cursor-pointer"
      >
        <Progress value={progress} />
      </div>
    </Card>
  );
}
