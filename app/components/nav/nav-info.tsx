"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

import { ScrollArea } from "@/app/components/ui/scroll-area";
import { P_2025 } from "@/app/mocks/patchs";

export default function NavInfo() {
  const [viewInfo, setViewInfo] = useState("false");

  const handleViewInfo = () => {
    setViewInfo("true");
    localStorage.setItem("view_03_02", "true");
  };

  useEffect(() => {
    setViewInfo(localStorage.getItem("view_03_02") ?? "false");
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 relative"
          onClick={handleViewInfo}
        >
          <Info />
          {viewInfo === "false" && (
            <div className="absolute top-1.5 right-1 size-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ScrollArea className="h-40 whitespace-pre-wrap">{P_2025}</ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
