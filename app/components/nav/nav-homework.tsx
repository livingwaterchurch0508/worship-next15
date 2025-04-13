"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";

import { H_2024 } from "@/app/mocks/homeworks";

export default function NavHomework() {
  const HOMEWORK_KEY = "view_homework_04_13";
  const REMOVE_HOMEWORK_KEY = "view_homework_03_30";
  const [viewHomeWork, setViewHomeWork] = useState("false");

  const handleViewHomerWork = () => {
    setViewHomeWork("true");
    localStorage.setItem(HOMEWORK_KEY, "true");
  };

  useEffect(() => {
    localStorage.removeItem(REMOVE_HOMEWORK_KEY);
    setViewHomeWork(localStorage.getItem(HOMEWORK_KEY) ?? "false");
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 relative"
          onClick={handleViewHomerWork}
        >
          <Bell />
          {viewHomeWork === "false" && (
            <div className="absolute top-1.5 right-1 size-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ScrollArea className="h-40 whitespace-pre-wrap">{H_2024}</ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
