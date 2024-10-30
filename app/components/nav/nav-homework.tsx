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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Bell />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ScrollArea className="h-40 whitespace-pre-wrap">{H_2024}</ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
