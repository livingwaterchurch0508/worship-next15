"use client";
import { ChevronDown, Play, Rows4, StepBack, StepForward } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";

export default function AudioPlayer() {
  return (
    <Card>
      <audio className="hidden" />
      <CardHeader>
        <div className="flex justify-between">
          <Button variant="ghost" size="icon">
            <Rows4 />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronDown />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <CardTitle>제목</CardTitle>
        </div>
        <div className="flex justify-between">
          <Button variant="ghost" size="icon">
            <StepBack />
          </Button>
          <Button variant="ghost" size="icon">
            <Play />
          </Button>
          <Button variant="ghost" size="icon">
            <StepForward />
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={33} />
      </CardFooter>
    </Card>
  );
}
