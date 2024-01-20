import { Link, Outlet } from "react-router-dom";
import { GaugeIcon, GoalIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { HorizontalNavigationTab } from "./HorizontalNavigationTab";

import { cn } from "@/lib/utils";

// TODO: switch보다 이게 더 짧음. 이게 제일 나은 듯?
const getTextCSS = (percentage: number) => {
  // Tailwind에서는 정적으로 추론 가능한 분기의 값들을 갖고 컴파일한다.
  // 런타임의 값은 반영되지 않는다고 한다!
  if (percentage >= 75) return "text-green-500";
  if (percentage >= 50) return "text-blue-500";
  if (percentage >= 25) return "text-yellow-500";
  return "text-red-500";
};

const getProgressActiveCSS = (percentage: number) => {
  if (percentage >= 75) return "bg-green-500";
  if (percentage >= 50) return "bg-blue-500";
  if (percentage >= 25) return "bg-yellow-500";
  return "bg-red-500";
};

const getProgressBgCSS = (percentage: number) => {
  if (percentage >= 75) return "bg-green-900/50";
  if (percentage >= 50) return "bg-blue-900/50";
  if (percentage >= 25) return "bg-yellow-900/50";
  return "bg-red-900/50";
};

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
          window.document.title = "MyRealFocus 0%";
          return 0;
        }

        window.document.title = `MyRealFocus ${prev + extra}%`;
        return prev + extra;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* 오늘의 작업은 상단에 표시됨 */}
      <div className="fixed left-0 top-0 flex w-full px-[1px]">
        <div
          style={{ width: `${percentage}%` }}
          className={cn("h-[2px] rounded-sm transition-all", getProgressActiveCSS(percentage))}
        ></div>
        <div
          style={{ width: `${100 - percentage}%` }}
          className={cn("h-[2px]", getProgressBgCSS(percentage))}
        ></div>
      </div>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 bg-layer-1 px-4">
          <Link to="/" className="flex items-center gap-2">
            <button>
              <div className="rounded-xl bg-violet-700 px-[6px] py-1">
                <GaugeIcon className="h-5 w-5" />
              </div>
            </button>
            <div className="flex gap-1">
              <h1 className="cursor-pointer select-none text-lg font-bold">MyRealFocus</h1>
              {/* 오늘 태스크 진행률 - 30% 미만은 빨간색, 66% 미만은 주황색, 이상은 파란색, 90%이상은 초록색 */}
              <span
                className={cn("align-super text-sm font-semibold italic", getTextCSS(percentage))}
              >
                {percentage}%
              </span>
            </div>
          </Link>
          <div className="hidden md:block">
            <HorizontalNavigationTab />
          </div>
        </div>
        {/* FIXME: 여기에 overflow-auto를 넣어주면 해당 영역의 높이를 지정하지 않아도 알아서 꽉 채우고 더 안 늘어남. */}
        {/* 어떻게 되는 건지 원리는 아예 모르겠음. */}
        <div className="w-full max-w-[1280px] grow self-center overflow-auto">
          <Outlet />
        </div>
        {/* 모바일에선 주소 표시줄 때문에 밑에 가려져 있어서 안 보이고, 좁아서 Memo와 copyright만 보임 */}
        <div className="flex h-16 shrink-0 items-center gap-4 bg-layer-1 px-4">
          <h1 className="flex items-center gap-2">
            <span className="text-lg font-bold">Goals</span>
            <GoalIcon className="mt-1 h-4 w-4" />
          </h1>
          <span
            className="mt-1 line-clamp-1 h-6 grow border-transparent text-sm text-content-2 hover:border-layer-6"
            title="프론트엔드 취업, my focus 프로젝트, 프로그래머스 데브코스"
          >
            프론트엔드 취업 (7it, 245h)
          </span>
          <span className="shrink-0 text-xs">
            Copyright 2024 @{" "}
            <Link className="text-blue-500 underline" to="https://github.com/seongbin9786">
              Seongbin Kim
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};
