import { Outlet } from "react-router-dom";

import { NavigationTab } from "./nav";

export const Layout = () => {
  return (
    // overflow-hidden은 Navigation Tab이 화면을 벗어나기 때문임
    <div className="bg flex h-screen w-screen flex-col overflow-hidden">
      <div className="flex h-16 items-center justify-between gap-2 bg-layer-1 px-4">
        <h1 className="cursor-pointer select-none text-lg font-bold">my-focus</h1>
        <NavigationTab />
      </div>
      <div className="w-full max-w-1280pxr grow self-center overflow-auto bg-layer-1">
        <Outlet />
      </div>
      <div className="h-16 bg-layer-1">
        <h2>Footer</h2>
        <span>D-30 이사 가는 날</span>
      </div>
    </div>
  );
};
