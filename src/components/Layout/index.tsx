import { Outlet } from "react-router-dom";
import { SpaceIcon } from "lucide-react";

import { Input } from "../ui/input";

import { NavigationTab } from "./nav";

export const Layout = () => {
  return (
    // overflow-hidden은 Navigation Tab이 화면을 벗어나기 때문임
    <div className="bg flex h-screen w-screen flex-col overflow-hidden">
      <div className="flex h-16 shrink-0 items-center justify-between gap-2 bg-layer-1 px-4">
        <div className="flex items-center gap-2">
          <h1 className="cursor-pointer select-none text-lg font-bold">my-focus</h1>
          <span className="text-sm text-content-2">태스크 87% 완료, 잔여: 4h, 생산:13h</span>
        </div>
        <div className="hidden md:block">
          <NavigationTab />
        </div>
      </div>
      <div className="w-full max-w-1280pxr grow self-center overflow-auto bg-layer-1">
        <Outlet />
      </div>
      <div className="flex h-16 shrink-0 items-center gap-4 bg-layer-1 px-4">
        <h1 className="flex items-center gap-2">
          <span className="text-lg font-bold">Memo</span>
          <SpaceIcon className="mt-1 h-4 w-4" />
        </h1>
        <Input
          className="h-6 grow border-transparent text-sm text-content-2 hover:border-layer-6"
          defaultValue="D-30 이사 가는 날"
        />
        <span className="shrink-0">
          Copyright 2024 @{" "}
          <a className="text-blue-500 underline" href="https://github.com/seongbin9786">
            Seongbin Kim
          </a>
        </span>
      </div>
    </div>
  );
};
