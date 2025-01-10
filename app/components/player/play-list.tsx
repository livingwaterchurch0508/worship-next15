"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { ChevronDown } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import PlayItem from "@/app/components/player/play-item";

import { Button } from "@/app/components/ui/button";
import { usePlayListStore } from "@/app/stores/play-list-store";
import { IPlayList } from "@/app/variables/interfaces";

export default function PlayList({
  showPlayList,
  setShowPlayListAction,
}: IPlayList) {
  const { playList, setPlayList } = usePlayListStore((state) => state);
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

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(MouseSensor),
    useSensor(KeyboardSensor),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over === null) return;

    if (active.id !== over.id) {
      const oldIndex = playList.findIndex(({ id }) => id === active.id);
      const newIndex = playList.findIndex(({ id }) => id === over.id);
      setPlayList(arrayMove(playList, oldIndex, newIndex));
    }
  };

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
          <DndContext onDragEnd={onDragEnd} sensors={sensors}>
            <SortableContext items={playList}>
              {playList.map((worship, index) => (
                <PlayItem worship={worship} key={index} />
              ))}
            </SortableContext>
          </DndContext>
        </ScrollArea>
      </CardContent>
    </Card>
  ) : null;
}
