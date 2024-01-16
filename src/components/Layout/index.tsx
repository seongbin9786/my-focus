import { Outlet } from "react-router-dom";
import { GoalIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { NavigationTab } from "./nav";

import { cn } from "@/lib/utils";

// TODO: switch보다 이게 더 짧음. 이게 제일 나은 듯?
const getColorForPercentage = (percentage: number) => {
  if (percentage >= 75) return "green";
  if (percentage >= 50) return "blue";
  if (percentage >= 25) return "yellow";
  return "red";
};

const getTextCSS = (percentage: number) => `text-${getColorForPercentage(percentage)}-500`;

export const Layout = () => {
  const [percentage, setPercentage] = useState(0);

  // (소소한 깨달음)
  // 발견: Vite에서 save할 때마다 useEffect가 새로 실행되는 듯? 그래서 여러 번 세이브하면 엄청 빨라짐
  // 해결방법: useEffect에서 해제해주면 됨!
  useEffect(function setTimer() {
    const intervalId = setInterval(() => {
      setPercentage((prev) => {
        const extra = Math.floor(Math.random() * 10);
        if (prev + extra > 100) {
          return 0;
        }

        return prev + extra;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    // overflow-hidden은 Navigation Tab이 화면을 벗어나기 때문임
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="flex items-center justify-between h-16 gap-2 px-4 shrink-0 bg-layer-1">
        <div className="flex items-center gap-2">
          <a href="https://github.com/seongbin9786/my-focus">
            <img src="/github-mark.png" className="w-6 h-6 cursor-pointer select-none" />
          </a>
          <div className="flex gap-1">
            <h1 className="text-lg font-bold cursor-pointer select-none">my-focus</h1>
            {/* 오늘 태스크 진행률 - 30% 미만은 빨간색, 66% 미만은 주황색, 이상은 파란색, 90%이상은 초록색 */}
            <span
              className={cn("align-super text-sm font-semibold italic", getTextCSS(percentage))}
            >
              {percentage}%
            </span>
          </div>
        </div>
        <div className="hidden md:block">
          <NavigationTab />
        </div>
      </div>
      {/* FIXME: 여기에 overflow-auto를 넣어주면 해당 영역의 높이를 지정하지 않아도 알아서 꽉 채우고 더 안 늘어남. */}
      {/* 어떻게 되는 건지 원리는 아예 모르겠음. */}
      <div className="w-full max-w-[1280px] grow self-center overflow-auto">
        <Outlet />
      </div>
      {/* 모바일에선 주소 표시줄 때문에 밑에 가려져 있어서 안 보이고, 좁아서 Memo와 copyright만 보임 */}
      <div className="items-center hidden h-16 gap-4 px-4 shrink-0 bg-layer-1 xl:flex">
        <h1 className="flex items-center gap-2">
          <span className="text-lg font-bold">Projects</span>
          <GoalIcon className="w-4 h-4 mt-1" />
        </h1>
        <span className="h-6 mt-1 text-sm border-transparent grow text-content-2 hover:border-layer-6">
          my focus 프로젝트, 데브코스,
        </span>
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
