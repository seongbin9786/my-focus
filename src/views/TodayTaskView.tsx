import { AlertTriangleIcon, ArrowBigRightDashIcon, CheckIcon, PauseIcon } from "lucide-react";

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
        name: "작업을 수정하는 UI를 기획, 퍼블리싱",
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
  todo: "bg-red-800/70 hover:bg-red-800/90 cursor-pointer",
  suspended: "bg-orange-800/70 hover:bg-orange-800/90 cursor-pointer",
};

const iconByStatus = {
  done: <CheckIcon className="w-4 h-4" />,
  wip: <ArrowBigRightDashIcon className="w-4 h-4" />,
  todo: <AlertTriangleIcon className="w-4 h-4" />,
  suspended: <PauseIcon className="w-4 h-4" />,
};

export const TodayTaskView = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="flex items-center justify-between">
          <span className="text-lg font-bold text-content-5">
            오늘의 태스크 - 총 예상 13h, 잔여 4h
          </span>
          <span className="text-sm text-content-2">(완료됨: 예상 9h / 소요 8h)</span>
        </h2>
      </div>
      <ol className="box-border flex flex-col gap-8 mx-2 xl:overflow-auto">
        {DUMMY_DATA.map(({ milestoneName, projectName, estimated, actual, tasks }) => (
          <li key={milestoneName} className="flex flex-col">
            <div className="text-2xl font-bold text-content-5">
              {milestoneName} (예상 {estimated} / 소요 {actual})
            </div>
            <div className="text-sm italic text-green-600">
              <span>하루 전 시작, 3개의 이슈, 3개의 태스크 진행 중, 3일 후 완료 예정</span>
              <div className="text-sm italic text-content-1">
                {projectName}, 1주일 전 시작, 1주일 후 완료 예정
              </div>
            </div>
            <ol className="flex flex-col p-4">
              {tasks.map(({ id, name, estimated, actual, status }) => (
                <li key={id} className={cn("flex flex-nowrap items-start gap-2 p-2")}>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      className={cn(
                        "flex gap-2 bg-layer-7 text-content-6",
                        bgColorByStatus[status],
                      )}
                    >
                      {iconByStatus[status]}
                      <span>
                        예상 {estimated} / 소요 {actual}
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
