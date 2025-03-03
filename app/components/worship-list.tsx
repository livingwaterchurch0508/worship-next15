"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { ChevronFirst, CircleX, Search } from "lucide-react";

import { Separator } from "@/app/components/ui/separator";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Input } from "@/app/components/ui/input";
import { ResizablePanel } from "@/app/components/ui/resizable";
import { Button } from "@/app/components/ui/button";

import { useToast } from "@/app/hooks/use-toast";
import { includeByCho } from "@/app/lib/search-util";
import { arraySort, setTextColor } from "@/app/lib/array-util";
import { useActiveItemStore } from "@/app/stores/active-item-store";
import { useIsFullScreenStore } from "@/app/stores/full-screen-store";
import { usePlayListStore } from "@/app/stores/play-list-store";
import { useSearchStore } from "@/app/stores/search-store";
import { useScoreItemStore } from "@/app/stores/score-item-store";
import { SORT_TYPES, WORSHIPS } from "@/app/variables/enums";
import { IHymn } from "@/app/variables/interfaces";

export default function WorshipList() {
  const { activeItem } = useActiveItemStore((state) => state);
  const { isFullScreen, setIsFullScreen, isAnimating, setIsAnimating } =
    useIsFullScreenStore((state) => state);
  const { addPlayList, tabNo } = usePlayListStore((state) => state);
  const { setScoreIndex } = useScoreItemStore((state) => state);
  const { search, setSearch } = useSearchStore((state) => state);
  const { toast } = useToast();

  const [worshipList, setWorshipList] = useState<IHymn[]>([]);

  useEffect(() => {
    const homeworks = [
      ...WORSHIPS.hymn,
      ...WORSHIPS.michael,
      ...WORSHIPS.pastor,
      ...WORSHIPS.print,
    ].filter(({ isHomework, isThisWeek }) => isHomework || isThisWeek);

    if (!search) {
      setWorshipList(
        arraySort(
          [
            ...homeworks,
            ...WORSHIPS[activeItem.menuType].filter(
              ({ isHomework, isThisWeek }) => !(isHomework || isThisWeek),
            ),
          ],
          SORT_TYPES.NUMBER_ASC,
          false,
        ),
      );
      return;
    }
    setWorshipList(
      arraySort(
        [
          ...homeworks,
          ...WORSHIPS[activeItem.menuType].filter(
            ({ title, isHomework, isThisWeek }) =>
              !(isHomework || isThisWeek) && includeByCho(search, title),
          ),
        ],
        SORT_TYPES.NUMBER_ASC,
        false,
      ),
    );
  }, [activeItem.menuType, search]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleAddPlayList = (worship: IHymn) => {
    if (addPlayList(tabNo, worship)) {
      toast({
        title: "재생목록 추가",
        description: (
          <p>
            <span className="text-blue-600 dark:text-blue-400">
              {worship.title}
            </span>
            {"이(가) 추가되었습니다."}
          </p>
        ),
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (isFullScreen) {
      setIsAnimating(true);
      const timeout = setTimeout(() => setIsAnimating(false), 100); // 애니메이션 시간과 동일하게 설정
      return () => clearTimeout(timeout);
    }
  }, [isFullScreen]);

  return (
    <ResizablePanel
      defaultSize={50}
      minSize={15}
      className={`${isFullScreen ? "animate-slide-left-out" : "animate-slide-left-in"} ${
        isFullScreen && !isAnimating ? "hidden" : ""
      }`}
    >
      <div className="flex items-center gap-2 p-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            className="pl-10 pr-10 py-2 border rounded-md"
            style={{ fontSize: "16px" }}
            value={search}
            onChange={handleChange}
          />
          {search.length > 0 && (
            <CircleX
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
              onClick={() => setSearch("")}
            />
          )}
        </div>
        {!isFullScreen && (
          <Button
            className="min-w-[24px]"
            variant="outline"
            size="icon"
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            <ChevronFirst className="w-6 h-6 text-gray-500 cursor-pointer" />
          </Button>
        )}
      </div>
      <ScrollArea
        className="w-full rounded-md border p-4"
        style={{ height: "calc(100dvh - 154px)" }}
      >
        <div className="p4">
          {worshipList.map((worship, index) => (
            <div key={`${activeItem.menuType}-${index}`} className="w-full">
              <div className="flex items-center">
                <span
                  className={`cursor-pointer truncate ${setTextColor(worship)}`}
                  onClick={() => handleAddPlayList(worship)}
                >
                  {worship.title}
                </span>
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </ResizablePanel>
  );
}
