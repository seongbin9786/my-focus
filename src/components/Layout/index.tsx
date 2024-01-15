import { Outlet } from "react-router-dom";
import { SpaceIcon } from "lucide-react";

import { Input } from "../ui/input";

import { NavigationTab } from "./nav";

export const Layout = () => {
  return (
    // overflow-hidden은 Navigation Tab이 화면을 벗어나기 때문임
    <div className="flex flex-col w-screen h-screen overflow-hidden bg">
      <div className="flex items-center justify-between h-16 gap-2 px-4 shrink-0 bg-layer-1">
        <div className="flex items-center gap-2">
          <a href="https://github.com/seongbin9786/my-focus">
            <img src="/github-mark.png" className="w-6 h-6 cursor-pointer select-none" />
          </a>
          <h1 className="text-lg font-bold cursor-pointer select-none">my-focus</h1>
          {/* 이거 items-center인데 높이가 보기 안 좋아서 line-height, vertical-align 써봤는데 안 돼서 mt-1 줌 */}
          <span className="mt-1 text-sm text-content-2">태스크 87% 완료, 잔여: 4h, 생산:13h</span>
        </div>
        <div className="items-center hidden gap-2 md:flex">
          <NavigationTab />
        </div>
      </div>
      <div className="w-full max-w-[1280px] grow self-center overflow-auto bg-layer-1">
        <Outlet />
      </div>
      <div className="flex items-center h-16 gap-4 px-4 shrink-0 bg-layer-1">
        <h1 className="flex items-center gap-2">
          <span className="text-lg font-bold">Memo</span>
          <SpaceIcon className="w-4 h-4 mt-1" />
        </h1>
        <Input
          className="h-6 text-sm border-transparent grow text-content-2 hover:border-layer-6"
          defaultValue="D-30 이사 가는 날"
        />
        {/* 모바일에선 주소 표시줄 때문에 밑에 가려져 있어서 안 보이고, 좁아서 Memo와 copyright만 보임 */}
        <span className="hidden shrink-0 xl:block">
          Copyright 2024 @{" "}
          <a className="text-blue-500 underline" href="https://github.com/seongbin9786">
            Seongbin Kim
          </a>
        </span>
      </div>
    </div>
  );
};
