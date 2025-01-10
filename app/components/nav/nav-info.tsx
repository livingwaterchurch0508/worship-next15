"use client";

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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Info />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ScrollArea className="h-40 whitespace-pre-wrap">{P_2025}</ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
