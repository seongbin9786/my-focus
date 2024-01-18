import { CheckSquareIcon, PauseIcon, SquareIcon, SquareSlashIcon } from "lucide-react";
import { useEffect, useReducer } from "react";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

const DUMMY_DATA = [
  {
    milestoneName: "일단 화면 만들기",
    projectName: "my-focus 사이드 프로젝트",
    estimated: "3h",
    actual: "4h",
    tasks: [
      {
        id: 1,
        name: "프로젝트 셋업 및 배포, 기본 레이아웃 잡기 프로젝트 셋업 및 배포, 기본 레이아웃 잡기 프로젝트 셋업 및 배포, 기본 레이아웃 잡기 프로젝트 셋업 및 배포, 기본 레이아웃 잡기",
        estimated: "1h",
        actual: "3h",
        status: "done",
      },
      {
        id: 2,
        name: "<오늘 남은 Task> 화면 기획 및 퍼블리싱",
        estimated: "1h",
        actual: "1h",
        status: "wip",
      },
      {
        id: 3,
        name: "투두 예시 - 수정하는 UI를 기획, 퍼블리싱",
        estimated: "1h",
        actual: "-",
        status: "todo",
      },
      {
        id: 4,
        name: "일시 중단된 작업 예시 (하루 지나면 종료됨)",
        estimated: "1h",
        actual: "-",
        status: "suspended",
      },
    ],
  },
  {
    milestoneName: "주말 작업하기",
    projectName: "데브코스 2차팀 프로젝트",
    estimated: "6h",
    actual: "7h",
    tasks: [
      {
        id: 1,
        name: "다크 모드 구현",
        estimated: "3h",
        actual: "7h",
        status: "done",
      },
      {
        id: 2,
        name: "모바일 대응",
        estimated: "3h",
        actual: "-",
        status: "todo",
      },
    ],
  },
] as const;

const bgColorByStatus = {
  done: "bg-green-800/70 hover:bg-green-800/90 cursor-pointer",
  wip: "bg-sky-800/70 hover:bg-sky-800/90 cursor-pointer",
  todo: "bg-zinc-500/70 hover:bg-zinc-500/90 cursor-pointer",
  suspended: "bg-red-800/70 hover:bg-red-800/90 cursor-pointer",
};

const iconByStatus = {
  done: <CheckSquareIcon className="h-4 w-4" />,
  wip: <SquareSlashIcon className="h-4 w-4" />,
  todo: <SquareIcon className="h-4 w-4" />,
  suspended: <PauseIcon className="h-4 w-4" />,
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

export const TodayTaskView = () => {
  const [, forceUpdate] = useReducer((state) => !state, false);
  const percentage = (() => {
    try {
      return Number(window.document.title.split(" ")[1].slice(0, -1));
    } catch {
      return 0;
    }
  })();

  useEffect(() => {
    const interval = setInterval(() => forceUpdate(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 오늘의 작업은 상단에 표시됨 */}
      <div className="fixed left-0 top-0 flex w-full px-[1px]">
        <div
          style={{ width: `${percentage}%` }}
          className={cn("h-[2px] rounded-sm", getProgressActiveCSS(percentage))}
        ></div>
        <div
          style={{ width: `${100 - percentage}%` }}
          className={cn("h-[2px]", getProgressBgCSS(percentage))}
        ></div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="flex items-center justify-between">
          <span className="font-bold text-content-5 md:text-lg">오늘의 작업 - 잔여 4h</span>
          <span className="text-xs text-content-2 md:text-sm">(완료됨: 예측 9h / 소요 8h)</span>
        </h2>
      </div>
      <ol className="box-border flex flex-col gap-12 md:mx-2 md:gap-8 xl:overflow-auto">
        {DUMMY_DATA.map(({ milestoneName, projectName, estimated, actual, tasks }) => (
          <li key={milestoneName} className="flex flex-col gap-2 md:gap-0">
            <div className="text-xl font-bold text-content-5 md:text-2xl">
              {milestoneName} (예측 {estimated} / 소요 {actual})
            </div>
            <div className="text-xs italic text-green-600 md:text-sm">
              <span>하루 전 시작, 3개의 이슈, 3개의 태스크 진행 중, 3일 후 완료 예정</span>
              <div className="text-sm italic text-content-1">
                {projectName}, 1주일 전 시작, 1주일 후 완료 예정
              </div>
            </div>
            <ol className="flex flex-col gap-4 md:gap-0 md:p-4">
              {tasks.map(({ id, name, estimated, actual, status }) => (
                <li
                  key={id}
                  className={cn(
                    "flex flex-col flex-nowrap items-start gap-1 p-2 md:flex-row md:gap-2",
                  )}
                >
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge
                      className={cn(
                        "flex gap-2 bg-layer-7 text-content-6",
                        bgColorByStatus[status],
                      )}
                    >
                      {iconByStatus[status]}
                      <span>
                        예측 {estimated} / 소요 {actual}
                      </span>
                    </Badge>
                  </div>
                  <span className="text-content-5">{name}</span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
};
