"use client";

import { Button } from "@/app/components/ui/button";

import { useOpenHelpStore } from "@/app/stores/open-help-store";
import { useIsMobile } from "@/app/hooks/use-mobile";

export default function Help() {
  const isMobile = useIsMobile();
  const { openHelp, setOpenHelp } = useOpenHelpStore((state) => state);

  return openHelp ? (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-10">
      <div>
        <div
          className={`fixed left-2 top-3 w-10 h-${isMobile ? "10" : "[200px]"} border-2 border-white text-white items-center text-center text-sm`}
        >
          메뉴 이동
        </div>
        <div className="fixed left-32 top-3 w-10 h-10 border-2 border-white text-white items-center text-center text-sm">
          메뉴 이동
        </div>
        <div className="fixed right-[24px] top-3 w-[38px] h-10 border-2 border-white text-white items-center text-center text-sm">
          테마 선택
        </div>
        <div className="fixed right-[64px] top-3 w-[38px] h-10 border-2 border-white text-white items-center text-center text-sm">
          <pre>{`도움말\n보기`}</pre>
        </div>
        <div className="fixed right-[104px] top-3 w-[38px] h-10 border-2 border-white text-white items-center text-center text-sm">
          숙제 보기
        </div>
        <div className="fixed right-[144px] top-3 w-[38px] h-10 border-2 border-white text-white items-center text-center text-sm">
          전체 검색
        </div>
      </div>
      <div
        className={`fixed ${isMobile ? "left-[20px] w-[calc(21dvw)]" : "left-[80px] w-[calc(21dvw)]"} top-[88px] h-10 border-2 border-white text-white items-center text-center text-sm`}
      >
        <pre>{`해당 메뉴\n제한 검색`}</pre>
      </div>
      <div
        className={`fixed ${isMobile ? "left-[calc(21dvw+22px)] w-[7dvw]" : "left-[30vw] w-[44px]"} top-[88px]  h-10 border-2 border-white text-white items-center text-center text-sm`}
      >
        <pre>{`목록\n닫기`}</pre>
      </div>
      <div
        className={`fixed ${isMobile ? "left-[20px]" : "left-[60px]"} top-[140px] w-[calc(28dvw)] h-[calc(100dvh-170px)] border-2 border-white text-white items-center text-center text-sm`}
      >
        <pre>
          {`메뉴에\n해당하는\n목록\n\n\n\n\n\n`}
          <span className="text-red-300">빨간색</span>
          {`:숙제\n`}
          <span className="text-yellow-300">노란색</span>
          {`:이번주\n`}
          <span className="text-blue-300">파란색</span>
          {`:음원+악보\n`}
          <span className="text-gray-300">회색</span>
          {`:악보만`}
        </pre>
      </div>
      <div className="fixed right-[20px] top-[88px] w-[60vw] h-[60dvh] border-2 border-white text-white items-center text-center text-sm">
        악보 영역
      </div>
      <div className="fixed right-[20px] bottom-[66px] w-[60vw] h-[17dvh] border-2 border-white text-white items-center text-center text-sm">
        <pre>{`재생목록\n\n좌측이나 위 검색창에서 \n검색된 목록에서 선택하여\n재생목록에 추가합니다.`}</pre>
      </div>
      <div className="fixed right-[24px] bottom-[20px] w-[40px] h-[44px] border-2 border-white text-white items-center text-center text-sm">
        <pre>{`다음\n재생`}</pre>
      </div>
      <div className="fixed right-[64px] bottom-[20px] w-[40px] h-[44px] border-2 border-white text-white items-center text-center text-sm">
        <pre>{`재생\n정지`}</pre>
      </div>
      <div className="fixed right-[104px] bottom-[20px] w-[40px] h-[44px] border-2 border-white text-white items-center text-center text-sm">
        <pre>{`이전\n재생`}</pre>
      </div>
      <div className="fixed right-[144px] bottom-[20px] w-[40px] h-[44px] border-2 border-white text-white items-center text-center text-sm">
        <pre>{`악보\n보기`}</pre>
      </div>
      <div
        className={`fixed ${isMobile ? "left-[calc(30dvw+15px)]" : "left-[calc(30dvw+44px)]"}  bottom-[20px] w-[40px] h-[44px] border-2 border-white text-white items-center text-center text-sm`}
      >
        <pre>{`재생목록\n보기`}</pre>
      </div>
      <Button
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        onClick={() => setOpenHelp(false)}
      >
        도움말 닫기
      </Button>
    </div>
  ) : null;
}
