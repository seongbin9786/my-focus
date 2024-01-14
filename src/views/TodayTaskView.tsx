import { LightbulbIcon } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DUMMY_DATA = [
  {
    milestoneName: "퍼블리싱하기",
    projectName: "my-focus",
    estimated: "3h",
    tasks: [
      {
        id: 1,
        name: "프로젝트 셋업 및 배포",
        estimated: "1h",
      },
      {
        id: 2,
        name: "뭘 할까요?",
        estimated: "1h",
      },
      {
        id: 3,
        name: "내가 할 일 3",
        estimated: "1h",
      },
    ],
  },
  {
    milestoneName: "v3",
    projectName: "데브코스 2차팀 프로젝트",
    estimated: "13h",
    tasks: [
      {
        id: 1,
        name: "다크 모드 구현",
        estimated: "3h",
      },
      {
        id: 2,
        name: "모바일 대응",
        estimated: "10h",
      },
    ],
  },
  {
    milestoneName: "v3",
    projectName: "데브코스 2차팀 프로젝트",
    estimated: "13h",
    tasks: [
      {
        id: 1,
        name: "다크 모드 구현",
        estimated: "3h",
      },
      {
        id: 2,
        name: "모바일 대응",
        estimated: "10h",
      },
    ],
  },
];

export const TodayTaskView = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold text-green-500">오늘 남은 Task (오늘 회고)</div>
        <Alert className="bg-layer-4 text-content-1">
          <LightbulbIcon className="h-4 w-4" color=" hsl(var(--content1))" />
          <AlertDescription>작업 클릭 시 Task 메모장이 출력됩니다</AlertDescription>
        </Alert>
      </div>
      {/* 모바일에선 전체 스크롤 되게 사용하고 PC에선 View 내에서 스크롤되게 사용. calc는 높이 설정을 수동으로라도 해야돼서 어쩔 수 없이 사용함. */}
      <ol className="mx-2 box-border flex flex-col gap-8 lg:h-[calc(100%-130px)] lg:overflow-auto">
        {DUMMY_DATA.map(({ milestoneName, projectName, estimated, tasks }) => (
          <li key={milestoneName} className="flex flex-col">
            <div className="text-2xl font-bold text-content-6">
              {milestoneName} ({estimated})
            </div>
            <div className="text-xs italic text-content-1">{projectName}</div>
            <ol className="flex flex-col gap-4 p-4">
              {tasks.map(({ id, name, estimated }) => (
                <li key={name} className="flex items-center gap-2">
                  <Checkbox id={`checkbox-${milestoneName}-task-${id}`} />
                  <label
                    htmlFor={`checkbox-${milestoneName}-task-${id}`}
                    className="font-medium leading-none text-content-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {name} ({estimated})
                  </label>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
};
