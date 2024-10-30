import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/components/ui/resizable";
import WorshipList from "@/app/components/worship-list";
import Player from "@/app/components/player";
import FullScreenButton from "@/app/components/full-screen-button";
import Score from "@/app/components/score";

export default function Home() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w rounded-lg border"
    >
      <WorshipList />
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70} minSize={30} className="flex relative">
        <Score />
        <FullScreenButton />
        <Player />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
