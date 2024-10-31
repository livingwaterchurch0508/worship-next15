"use client";

import { Info } from "lucide-react";

import { Button } from "@/app/components/ui/button";

import { useOpenHelpStore } from "@/app/stores/open-help-store";

export default function NavInfo() {
  const { setOpenHelp } = useOpenHelpStore((state) => state);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7"
      onClick={() => setOpenHelp(true)}
    >
      <Info />
    </Button>
  );
}
