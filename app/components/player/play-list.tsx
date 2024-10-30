"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ChevronDown, X } from "lucide-react";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { WORSHIPS } from "@/app/variables/enums";
import { Separator } from "@/app/components/ui/separator";
import { Button } from "@/app/components/ui/button";

export default function PlayList() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>노래 목록</CardTitle>
          <Button variant="ghost" size="icon">
            <ChevronDown />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 w-full rounded-md border p-4">
          <div className="p4">
            {WORSHIPS["HYMN"].map((worship, index) => (
              <div key={index} className="w-full">
                <div className="flex justify-between">
                  <span>{worship.title}</span>
                  <Button variant="ghost" size="icon">
                    <X />
                  </Button>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
