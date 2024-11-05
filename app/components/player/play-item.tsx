import { Button } from "@/app/components/ui/button";
import { BookOpen, GripVertical, Pause, Play, X } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";
import { IPlayHymn } from "@/app/variables/interfaces";
import { useScoreItemStore } from "@/app/stores/score-item-store";
import { usePlayListStore } from "@/app/stores/play-list-store";
import { useSortable } from "@dnd-kit/sortable";

interface IPlayItem {
  worship: IPlayHymn;
}

export default function PlayItem({ worship }: IPlayItem) {
  const { playIndex, isPlaying, removePlayList, setPlayIndex, setIsPlaying } =
    usePlayListStore((state) => state);
  const { scoreIndex, setScoreIndex } = useScoreItemStore((state) => state);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: worship.index });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} className="w-full" style={style} {...attributes}>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2 truncate">
          <Button variant="ghost" size="icon" {...listeners}>
            <GripVertical />
          </Button>
          <span
            className={
              playIndex === worship.index
                ? "text-blue-700 dark:text-blue-300 truncate"
                : "truncate"
            }
          >
            {worship.title}
          </span>
        </div>
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
