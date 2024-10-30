"use client";

import { ChevronLast } from "lucide-react";

import { Button } from "@/app/components/ui/button";

import { useIsFullScreenStore } from "@/app/stores/full-screen-store";

export default function FullScreenButton() {
  const { isFullScreen, setIsFullScreen, isAnimating } = useIsFullScreenStore(
    (state) => state,
  );

  return isFullScreen && !isAnimating ? (
    <Button
      variant="outline"
      size="icon"
      className="absolute left-0 top-0"
      onClick={() => setIsFullScreen(!isFullScreen)}
    >
      <ChevronLast />
    </Button>
  ) : null;
}
