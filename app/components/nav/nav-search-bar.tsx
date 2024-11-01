"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { CircleX, Search } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Input } from "@/app/components/ui/input";

import { includeByCho } from "@/app/lib/search-util";
import { usePlayListStore } from "@/app/stores/play-list-store";
import { IHymn } from "@/app/variables/interfaces";
import { MENU_TITLES, SORT_TYPES, WORSHIPS } from "@/app/variables/enums";
import { arraySort } from "@/app/lib/array-util";

export default function NavSearchBar() {
  const { addPlayList } = usePlayListStore((state) => state);

  const [search, setSearch] = useState("");
  const [worshipList, setWorshipList] = useState<IHymn[]>([]);

  useEffect(() => {
    if (!search) {
      setWorshipList([]);
      return;
    }

    setWorshipList(
      arraySort(
        [
          ...WORSHIPS.hymn,
          ...WORSHIPS.michael,
          ...WORSHIPS.pastor,
          ...WORSHIPS.print,
        ].filter(({ title }) => includeByCho(search, title)),
        SORT_TYPES.NUMBER_ASC,
        false,
      ),
    );
  }, [search]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Search />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center gap-2 p-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              className="pl-10 pr-10 py-2 border rounded-md"
              style={{ fontSize: "16px" }}
              value={search}
              onChange={handleChange}
            />
            <CircleX
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
              onClick={() => setSearch("")}
            />
          </div>
        </div>
        <ScrollArea
          className="w-full rounded-md border p-4"
          style={{
            height: "20dvh",
            minHeight: "250px",
            display: worshipList.length === 0 ? "none" : "block",
          }}
        >
          <div className="p4">
            {worshipList.map((worship, index) => (
              <div key={`worship-${index}`} className="w-full">
                <div className="flex items-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => addPlayList(worship)}
                  >
                    {`${MENU_TITLES[worship.type].substring(0, 1)} ${worship.title}`}
                  </span>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
